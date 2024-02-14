import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import MainCard from 'ui-component/cards/MainCard';
import InputOnChange from 'components/input/InputOnChange';
import { Button, Grid } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';

const ChatGPT = () => {
    const configuracion = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });

    const openAI = new OpenAIApi(configuracion);

    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);

        try {
            const response = openAI.createCompletion({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                temperature: 0.5,
                max_tokens: 2000,
                stop: 'None'
            })
            setResult((await response).data.choices[0].text);
            setLoading(false);
        } catch (error) {
            setLoading(false)
        }

    }

    return (
        <MainCard title="ChatGPT">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputOnChange
                        label="Escribe tu Consulta"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        size="medium"
                        rows="5"
                        multiline
                    />
                </Grid>

                <Grid item xs={3}>
                    <AnimateButton>
                        <Button variant="contained" fullWidth onClick={handleClick}>
                            Consultar
                        </Button>
                    </AnimateButton>
                </Grid>
            </Grid>




            {/* <div className="ChatGPT">
                <main>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h2>Nube ChaGPT by Nube Colectiva</h2>
                                {
                                    result.length > 0 && <div id='resultados' className='alert alert-success' role='alert'>{result}</div>
                                }

                                <div className='mb-3'>
                                    <textarea type='text' className='form-control' rows='5' value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder='Escribe tu Consulta'></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <button type='button' className='btn btn-primary' onClick={handleClick} disabled={loading || prompt.length === 0}>{loading ? "Enviando..." : "Enviar"}</button>
            </div> */}
        </MainCard>
    );
}

export default ChatGPT;
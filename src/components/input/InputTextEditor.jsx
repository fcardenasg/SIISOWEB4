import { Box, Divider, FormControl, FormHelperText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Controller } from 'react-hook-form';

const RichTextEditor = ({ value, onChange, error, label, placeholder, ...other }) => {
    const theme = useTheme();
    const [editorState, setEditorState] = useState(() => {
        if (value) {
            const contentBlock = htmlToDraft(value);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                return EditorState.createWithContent(contentState);
            }
        }
        return EditorState.createEmpty();
    });

    const debouncedOnChange = useCallback(
        debounce((currentContent) => {
            const html = draftToHtml(convertToRaw(currentContent));
            onChange(html);
        }, 500),
        [onChange]
    );

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        debouncedOnChange(newEditorState.getCurrentContent());
    };

    return (
        <FormControl error={!!error} fullWidth>
            {label && (
                <Box sx={{ flex: 'column', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" sx={{ mb: 1.5 }}>{label}</Typography>
                    <Divider />
                </Box>
            )}

            <Box
                sx={{
                    border: '1px solid',
                    borderColor: error ? theme.palette.error.main : theme.palette.grey[400],
                    borderRadius: `${theme.shape.borderRadius}px`,
                    '&:hover': {
                        borderColor: error ? theme.palette.error.dark : theme.palette.primary.main,
                    },
                    '&:focus-within': {
                        borderColor: theme.palette.primary.main,
                        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
                    },
                    minHeight: '300px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    placeholder={placeholder}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image', 'remove', 'history'],
                        inline: { inDropdown: false },
                        list: { inDropdown: false },
                        textAlign: { inDropdown: false },
                        link: { inDropdown: false },
                        history: { inDropdown: false },
                    }}
                    editorStyle={{
                        padding: '0 16px',
                        minHeight: '100px',
                    }}
                    toolbarStyle={{
                        border: 'none',
                        borderBottom: `1px solid ${theme.palette.grey[300]}`,
                        marginBottom: 0,
                        backgroundColor: theme.palette.grey[50],
                    }}
                    {...other}
                />
            </Box>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
};

RichTextEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.object,
    label: PropTypes.string,
    placeholder: PropTypes.string,
};

const InputTextEditor = ({ name, label, defaultValue = "", ...other }) => {
    return (
        <Controller
            name={name}
            defaultValue={defaultValue}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <RichTextEditor
                    value={value}
                    onChange={onChange}
                    error={error}
                    label={label}
                    placeholder="Digite el texto"
                    {...other}
                />
            )}
        />
    );
};

InputTextEditor.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
};

export default InputTextEditor;
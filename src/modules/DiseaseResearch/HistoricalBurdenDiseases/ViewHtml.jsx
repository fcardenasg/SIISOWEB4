export default function ViewHtml({html}){
     return (
    <div style={{ padding: 20 }}>
   

      {/* Aquí mostramos el HTML */}
      {html && (
        <div
          style={{ marginTop: 20 }}
          contentEditable={true}  
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
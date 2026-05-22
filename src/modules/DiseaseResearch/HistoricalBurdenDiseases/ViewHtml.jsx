export default function ViewHtml(htmlString) {
  const blob = new Blob([htmlString], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box"
      }}
      contentEditable
      suppressContentEditableWarning={true}
      dangerouslySetInnerHTML={{ __html: htmlString.html }}
    />
  );
}

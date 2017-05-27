 const getElementFromTemplate = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, `text/html`);
  const el = doc.body.firstElementChild;
  return el;
}

 export default getElementFromTemplate;

const getElementFromTemplate = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, `text/html`);
  return doc.body.firstElementChild;
};

export default getElementFromTemplate;

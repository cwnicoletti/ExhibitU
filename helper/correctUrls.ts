const correctUrls = (links: object) => {
  let linkNumber: number = 1;
  for (const link of Object.keys(links)) {
    // Prepend https:// to link url
    if (!links[link][`linkUrl${linkNumber}`].includes("https://")) {
      links[link][`linkUrl${linkNumber}`] = `https://${
        links[link][`linkUrl${linkNumber}`]
      }`;
    }
    linkNumber += 1;
  }
  return links;
};

export default correctUrls;

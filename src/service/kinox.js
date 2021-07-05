import { stream } from '@/utils/generator';
// https://www.kinos.to/Kino-filme.html
const PROXY = 'https://cors-anywhere.herokuapp.com/';

export function getMovies () {
  return doRequest('https://www.kinos.to/Kino-filme.html')
    .then((data) => {
      return getNodesFromHTMLStringBySelector(
        data,
        '#dontbeevil > menu + div > div[onclick]'
      );
    })
    .catch((e) => {
      throw new Error(e);
    });
}

export function getMoviesBy (options) {
  return stream((i, options) => {
    const url = `list/?iDisplayStart=0&iDisplayLength=10&Page=${i + 1}&Per_Page=${options.length}&per_page=${options.length}&ListMode=cover&additional={"fType":"movie","Length":${options.length},"fLetter":"E"}`;
    return url;
  }, options);
}

function doRequest (url) {
  return fetch(`${PROXY}${url}`)
    .then(data => data.text())
    .catch((e) => {
      throw new Error(e);
    });
}

function getNodesFromHTMLStringBySelector (result, selector) {
  return [
    ...createHTMLFragment(result).querySelectorAll(selector)
  ];
}

function createHTMLFragment (html) {
  return document.createRange().createContextualFragment(cleanHTML(html));
}

function cleanHTML (html) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/(src|href)=/gi, 'data-$1=');
}

import intro, { attributes } from './intro.mdx';

console.log(intro, attributes);

document.querySelector('#root').innerHTML = intro;
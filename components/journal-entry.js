// <journal-entry> custom web component
class JournalEntry extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            .entry {
                background-color: white;
                border-radius: 6px;
                list-style-type: none;
                margin-bottom: 30px;
                max-width: 700px;
                padding: 20px;
                width: 80%;
                transition-duration: .4s;
            }

            .entry:hover {
                filter: brightness(80%);
            }
            
            .entry:active {
                filter: brightness(60%);
                transition-duration: 0s;
            }

            .entry-audio {
                margin: 10px 0;
                width: 95%;
            }

            .entry-content {
                font-size: 20px;
                margin: 10px 0;
                text-indent: 30px;
            }

            .entry-date {
                color: rgb(163, 163, 163);
                font-size: 20px;
                margin-top: 3px;
                margin-bottom: 20px;
            }

            .entry-image {
                height: 100%;
                max-height: 350px;
                max-width: 550px;
            }

            .entry-title {
                margin-bottom: 5px;
                margin-top: 5px;
            }
        </style>
        <article class="entry">
            <h2 class="entry-title"></h2>
            <p class="entry-date"></p>
            <p class="entry-content"></p>
        </article>
        `;

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  get entry() {
    let entryObj = {
      'title': this.shadowRoot.querySelector('.entry-title').innerText,
      'date': this.shadowRoot.querySelector('.entry-date').innerText,
      'content': this.shadowRoot.querySelector('.entry-content').innerText,
    };

    if (this.shadowRoot.querySelector('.entry-image')) {
      let imageObj = {
        'src': this.shadowRoot.querySelector('.entry-image').getAttribute('src'),
        'alt': this.shadowRoot.querySelector('.entry-image').getAttribute('alt')
      }
      entryObj.image = imageObj;
    }

    if (this.shadowRoot.querySelector('.entry-audio')) {
      entryObj.audio = this.shadowRoot.querySelector('.entry-audio').getAttribute('src');
    }

    return entryObj;
  }

  set entry(entry) {
    this.shadowRoot.querySelector('.entry-title').innerText = entry.title;
    this.shadowRoot.querySelector('.entry-date').innerText = entry.date;
    this.shadowRoot.querySelector('.entry-content').innerText = entry.content;
    if (entry.image) {
      let entryImage = document.createElement('img');
      entryImage.classList.add('entry-image');
      entryImage.src = entry.image.src;
      entryImage.alt = entry.image.alt;
      this.shadowRoot.querySelector('.entry').appendChild(entryImage);
    }
    if (entry.audio) {
      let entryAudio = document.createElement('audio');
      entryAudio.classList.add('entry-audio');
      entryAudio.src = entry.audio;
      entryAudio.controls = true;
      this.shadowRoot.querySelector('.entry').appendChild(entryAudio);
    }
  }

}

customElements.define('journal-entry', JournalEntry);

/**
 * JSON Format:
 * image and audio will only sometimes be there
 *
 * {
 *   title: 'foo',
 *   date: 'foo',
 *   content: 'foo',
 *   image: {
 *     src: 'foo.com/bar.jpg',
 *     alt: 'foo'
 *   },
 *   audio: 'foo.com/bar.mp3'
 * }
 */

class ToggleSwitch extends HTMLElement {
  constructor() {
    super()
    this._root = this.attachShadow({ mode: 'closed' })
  }

  async connectedCallback() {
    this.render()
  }

  get style() {
    return /*CSS*/ `
      <style>
        :host {
          --bg-color-night: #1b1d28;
          --bg-color-sky: #4a8cc4;
          --bg-color-sun: #f1c426;
          --bg-color-moon: #c3c9d4;
          --bg-color-crater: #979eb3;
          --bg-color-star: #fafafa;
          --color-cloud: rgba(243, 249, 255, 1);
          --color-cloud-back: rgb(243, 249, 253);
          --transition-duration: 600ms;
          --star-size: 7px;
          --cloud-size: 15px;
        }

        /* The switch - the box around the slider */
        .switch {
          border-radius: 34px;
          display: inline-block;
          height: 26px;
          overflow: hidden;
          position: relative;
          width: 60px;
        }

        /* Hide default HTML checkbox */
        .switch input {
          height: 0;
          opacity: 0;
          width: 0;
        }

        /* The slider */
        .slider {
          -webkit-transition: var(--transition-duration);
          background-color: var(--bg-color-sky);
          border-radius: 34px;
          bottom: 0;
          box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2) inset,
            0px 0px 2px rgba(0, 0, 0, 0.2) inset;
          cursor: pointer;
          left: 0;
          overflow: hidden;
          position: absolute;
          right: 0;
          top: 0;
          transition: var(--transition-duration);
        }

        .sun-container {
          -webkit-transition: var(--transition-duration);
          border-radius: 50%;
          bottom: 3px;
          box-shadow: 0px 0px 1px 8px rgba(255, 255, 255, 0.1),
            0px 0px 1px 14px rgba(255, 255, 255, 0.1),
            0px 0px 1px 20px rgba(255, 255, 255, 0.1);
          height: 20px;
          left: 3px;
          overflow: hidden;
          position: absolute;
          transition: var(--transition-duration);
          width: 20px;
        }

        /* the sun */
        .sun-container::before {
          -webkit-transition: var(--transition-duration);
          background-color: var(--bg-color-sun);
          border-radius: 100%;
          box-shadow: 1px 1px 1px -1px rgba(255, 255, 255) inset,
            -1px -1px 1px -1px rgba(0, 0, 0, 0.2) inset;
          content: '';
          height: 100%;
          position: absolute;
          transition: var(--transition-duration);
          width: 100%;
        }

        /* the moon */
        .sun-container::after {
          -webkit-transition: var(--transition-duration);
          background-color: var(--bg-color-moon);
          background-image: radial-gradient(
              var(--bg-color-crater) 50%,
              transparent 1%
            ),
            radial-gradient(var(--bg-color-crater) 50%, transparent 1%),
            radial-gradient(var(--bg-color-crater) 50%, transparent 1%);
          background-position: 2px 6px, 12px 10px, 7px 2px;
          background-repeat: no-repeat;
          background-size: 10px 10px, 6px 6px, 5px 5px;
          border-radius: 100%;
          box-shadow: 1px 1px 1px -1px rgba(255, 255, 255) inset,
            -1px -1px 1px -1px rgba(0, 0, 0, 0.2) inset;
          content: '';
          height: 100%;
          position: absolute;
          right: -22px;
          transition: var(--transition-duration);
          width: 100%;
        }

        input:checked ~ .slider {
          background-color: var(--bg-color-night);
          background-position: top;
        }

        input:checked ~ .sun-container {
          -webkit-transform: translateX(34px);
          -ms-transform: translateX(34px);
          transform: translateX(34px);
        }

        input:checked ~ .sun-container::after {
          right: 0px;
        }

        input:checked ~ .stars {
          top: -13px;
        }

        input:checked ~ .clouds {
          top: -12px;
        }

        .stars {
          -webkit-transition: var(--transition-duration);
          height: 24px;
          position: relative;
          top: -38px;
          transition: var(--transition-duration);
          width: 60px;
        }

        .star {
          -webkit-background-clip: text;
          background-clip: text;
          background-color: var(--bg-color-star);
          color: transparent;
          font-size: 6px;
          height: var(--star-size);
          left: 11px;
          position: absolute;
          top: 2px;
          width: var(--star-size);
          z-index: 1;
        }

        .star:nth-child(1) {
          font-size: calc(var(--star-size) * 0.285);
          left: 12%;
          top: 34%;
        }
        .star:nth-child(2) {
          font-size: calc(var(--star-size) * 0.143);
          left: 16%;
          top: 76%;
        }
        .star:nth-child(3) {
          font-size: calc(var(--star-size) * 0.143);
          left: 14%;
          top: 84%;
        }
        .star:nth-child(4) {
          font-size: calc(var(--star-size) * 0.572);
          left: 22%;
          top: 10%;
        }
        .star:nth-child(5) {
          font-size: calc(var(--star-size) * 0.285);
          left: 22%;
          top: 46%;
        }
        .star:nth-child(6) {
          font-size: calc(var(--star-size) * 0.143);
          left: 24%;
          top: 90%;
        }
        .star:nth-child(7) {
          font-size: calc(var(--star-size) * 0.143);
          left: 38%;
          top: 54%;
        }
        .star:nth-child(8) {
          font-size: calc(var(--star-size) * 0.285);
          left: 42%;
          top: 28%;
        }
        .star:nth-child(9) {
          font-size: calc(var(--star-size) * 0.429);

          left: 42%;
          top: 76%;
        }
        .star:nth-child(10) {
          font-size: calc(var(--star-size) * 0.714);
          left: 50%;
          top: 24%;
        }
        .star:nth-child(11) {
          font-size: calc(var(--star-size) * 0.285);
          left: 51%;
          top: 62%;
        }

        .clouds {
          --cloud: radial-gradient(
            ellipse at center,
            var(--color-cloud) 70%,
            transparent 0%
          );
          --cloud-back: radial-gradient(  
            ellipse at center,
            #94b8d7 70%,
            transparent 0%
          );

          --cloud-back-1-position: 19px 14px;
          --cloud-back-2-position: 28px 14px;
          --cloud-back-3-position: 33px 10px;
          --cloud-back-4-position: 42px 8px;
          --cloud-back-5-position: 51px -2px;

          --cloud-1-position: 20px 18px;
          --cloud-2-position: 29px 20px;
          --cloud-3-position: 37px 18px;
          --cloud-4-position: 46px 12px;
          --cloud-5-position: 52px 4px;

          --cloud-back-1-size: 16px 16px;
          --cloud-back-2-size: 16px 16px;
          --cloud-back-3-size: 16px 16px;
          --cloud-back-4-size: 16px 16px;
          --cloud-back-5-size: 16px 16px;

          --cloud-1-size: 16px 16px;
          --cloud-2-size: 16px 16px;
          --cloud-3-size: 16px 16px;
          --cloud-4-size: 16px 16px;
          --cloud-5-size: 16px 16px;
          z-index: 3;
          top: -38px;
          width: 60px;
          height: 24px;
          -webkit-transition: var(--transition-duration);
          transition: var(--transition-duration);
          position: relative;
          border: 1px solid transparent;
          background-image: var(--cloud), var(--cloud), var(--cloud), var(--cloud),
            var(--cloud), var(--cloud-back), var(--cloud-back), var(--cloud-back),
            var(--cloud-back), var(--cloud-back);
          background-position: var(--cloud-1-position), var(--cloud-2-position),
            var(--cloud-3-position), var(--cloud-4-position),
            var(--cloud-5-position), var(--cloud-back-1-position),
            var(--cloud-back-2-position), var(--cloud-back-3-position),
            var(--cloud-back-4-position), var(--cloud-back-5-position);
          background-size: var(--cloud-1-size), var(--cloud-2-size),
            var(--cloud-3-size), var(--cloud-4-size), var(--cloud-5-size),
            var(--cloud-back-1-size), var(--cloud-back-2-size),
            var(--cloud-back-3-size), var(--cloud-back-4-size),
            var(--cloud-back-5-size);
          background-repeat: no-repeat;
        }
      </style>
  `
  }

  render() {
    const template = document.createElement('template')
    template.innerHTML = /*HTML*/ `
      ${this.style}
      <label class="switch">
      <input type="checkbox" />
      <div class="stars">
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
        <span class="star">✦</span>
      </div>
      <div class="clouds"></div>
      <div class="slider"></div>
      <span class="sun-container"></span>
    </label>
    `
    this._root.replaceChildren(template.content.cloneNode(true))
  }
}

customElements.define('fm-toggle-switch', ToggleSwitch)

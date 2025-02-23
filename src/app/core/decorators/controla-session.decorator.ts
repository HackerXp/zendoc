const panelcss = `display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
position: absolute;
top: 0;
bottom: 0;
left: 0;
right: 0;
overflow: auto;
z-index: 999;
color: #000;
box-sizing: border-box;
background-color: #ECEFF1;`;

const panelcontent = `margin: 0;
user-select: none;
text-align: center;
font-weight: 300;
font-family: 'IBM Plex Sans', sans-serif`;

export default function (timeoutSession: number, redirect: string) {
  let timeout: any = 0;
  return function (key: any, property: any, descriptor: any) {
    const methodOriginal = descriptor.value;
    descriptor.value = function (args: any[]) {
      document.addEventListener('mousemove', () => {
        clearTimeout(timeout);
        if (!window.location.href.includes('login')) {
          timeout = setTimeout(() => {
            document.write(`<div style="${panelcss}"><h2 style="${panelcontent}">Tempo de sessão expirou.</h2>
                        </div>`);
            sessionStorage.clear();
            setTimeout(() => {
              window.location.href = redirect;
            }, 2000);
          }, timeoutSession);
        }
      });
      methodOriginal.apply(this, args);
    };
    return descriptor;
  };
}

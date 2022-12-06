// @refresh reload
import { createSignal, JSXElement } from 'solid-js';
import { render } from 'solid-js/web';

window.api.on('greet-back', (event) => {
  console.log(event);
});

const App: () => JSXElement = () => {
  const [count, setCount] = createSignal(0);

  const handleClick = () => {
    setCount(c => c + 1);
  };

  const sendGreetings = () => {
    window.api.send('greet', 'Greetings from the Renderer!');
  };

  return (
    <div>
      <div>
        <button onClick={handleClick}>Count: {count()}</button>
        {` `}
        <button onClick={sendGreetings}>Send Greetings to Main</button>
      </div>
    </div>
  );
};

render(App, document.body);
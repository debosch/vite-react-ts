import React from 'react';

function renderItem(props) {
    const [scroll, setScroll] = React.useState(0);
    const [number, setNumber] = React.useState(0)
    const [value, setValue] = React.useState('')
    const [testData, setTestData] = React.useState(['Яблоко', 'Банан', 'Насос', 'Крышка'])

    React.useEffect(async() => {
      document.addEventListener("scroll", (event) => {
        console.log(event)
        setScroll(event.currentTarget.scrollTop);
      });

      // Костыль, что бы скролл отрабатывал корректно (убирать нельзя)
      setTimeout(() => {
          setScroll(0)
      }, 100)
    }, []);

    const change = ({target}) => {
      setValue(target.value)
      fetch('https://test.case/api/v1/get-directory', {
        method: "POST",
        body: JSON.stringify(target.value)
      })
      .then((response) => response.json())
      .then((response) => setNumber(response.value))
    }

  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
      {`Scroll: ${scroll}`}
      {`Number: ${number}`}
      <div style={{height: '100px', overflow: 'auto'}}>
         {testData.map((el) => (
          <div>{`Справочник №${el}`}</div>
         ))}
      </div>
      <input value={value} onChange={change}/>
    </div>
  );
}

export default renderItem

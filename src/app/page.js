'use client'

import styles from "./page.module.css";
import React from "react";
import OpenAI from "openai";

// -----------------------------------------------------------------------
// const apiKey = "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";
// --------------------------------------------------------------------------



const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true
});

export default function Home() {
  const [prompt, setPrompt] = React.useState('')
  const [ques, setQues] = React.useState('')
  const [output, setOutput] = React.useState('')
  const [isWait, setIsWait] = React.useState(false)

  const handleClick = async () => {
    setIsWait(!isWait)
    setQues(prompt)
    setOutput('')
    // Your click handler logic
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ "role": "user", "content": prompt }],
        model: "gpt-3.5-turbo",
      });
      console.log('Button clicked!', completion.choices[0]?.message.content);
      setOutput(completion.choices[0].message?.content)
      setIsWait(false)
    } catch (error) {
      console.log(error)
      setIsWait(false)

    }



  };

  const gptHandle = () => {

    if (prompt !== '') {
      handleClick()
    }
    else {
      alert('Please write a question')
    }

  }


  return (
    <div className={styles.main}>

      <div className={styles.promptBox}>

        <input type="text" onChange={e => setPrompt(e.target.value)} className={styles.promptInp} name="prompt" placeholder="Ask me" id="text" />
        {
          isWait ? '' :
            <button onClick={gptHandle} disabled={isWait} className={styles.searchBtn} >Go</button>
        }
      </div>

      {
        output !== '' ? <div className={styles.outputBpx}>
          <p>Ques : {ques}</p>
          <p> Answer : {output}</p>
        </div> :
          <>
              {
                isWait && <p className={styles.loading}>Please wait...</p>
              }
          </>
      }
{/* <p className={styles.loading}>Please wait...</p> */}
    </div>
  );
}


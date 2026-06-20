import { useState } from 'react'

import './App.css'
import DragableElement from './components/DragableElement'
import DropBox from './components/DropBox'
import Sparkles from './components/Sparkles'

function App() {
  const [count, setCount] = useState(0)
  const [spawnParticles, setSpawnParticles] = useState<boolean>(false)

  return (
    <>
      <section id="center" onClick={() => {
        setSpawnParticles(true)
        const ti = setTimeout(() => {
          clearTimeout(ti)
          setSpawnParticles(false)
        }, 10);
      }}>
        <div className="hero">
          <DragableElement keyId='S11ri' freeze={true} hide={true}>
            <img src='./s11r2.png' style={{width: "20wv", height: "20vh"}}></img>
          </DragableElement>
          <DropBox keyId={"S11ri"}>
            <img src="./bin.png" alt="" style={{width: "20wv", height: "20vh"}} />
          </DropBox>
        </div>
        <div>
          <h1>Welcome to S11risof1a hate site</h1>
          <p>
            Here we hate s11risof1a very much.
            You may banish her to the island by dragging.
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          You hate s11r1sof1a this much: {count}
        </button>
      </section>

      <div className="ticks"></div>

      
      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Watch this grill here</h2>
          <p>She streams about shopping, should eat some socks</p>
          <ul>
            <li>
            <a href="https://www.twitch.tv/s11r1sof1a">Twitch</a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Support me</h2>
          <p>Here you can find me</p>
          <ul>
            <li>
              <a href="https://github.com/jepuli124" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
           
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      <Sparkles spawnParticles={spawnParticles}></Sparkles>
    </>
  )
}

export default App

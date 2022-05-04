import { useState, useEffect } from 'react'
import { digimons } from '../../mockup/digimonMockup'
import './styles.css'

export function Home () {
    const [digimonSearch, setDigimonSearch] = useState('')
    const [randomDigimon, setRandomDigimon] = useState(1);
    const [digimonName, setDigimonName] = useState({})
    const [digimonCheck, setDigimonCheck] = useState(false)
    const [timer, setTimer] = useState(3)
    const [score, setScore] = useState(0)
    const [best, setBest] = useState()
    const [lose, setLose] = useState(false)

    async function DigimonRandom() { 
        const max = 6
        const min = 1
        const num = Math.floor(Math.random() * (max - min + min) + min)  
        setRandomDigimon(num)
        const getBest = window.localStorage.getItem('Racha');
        setBest(getBest)
        }

    function whoIsThatDigimon() {
          digimons.map((digimon) => {
            if(digimon.id === randomDigimon) {
             setDigimonName(digimon)
            }
            return setDigimonCheck(false)
        })
    }

    function nextDigimon() {
        DigimonRandom()
        whoIsThatDigimon()
        setScore(0)
        digimonLose()
    }

    function digimonLose() {
        setLose(true)
        setDigimonCheck(true)
            setTimeout(() => {
                setLose(false)
                setDigimonCheck(false)
            }, [3000])
    }

    useEffect(() => {
        if (digimonCheck === true) {
        setTimeout(()=> {
            const restTime = timer - 1
            setTimer(restTime)
        }, [1000])
        }else {
            setTimer(3)
        }
    },[timer, digimonCheck])
    

    useEffect(() => {
        if(digimonCheck === true && lose === false) {
            const streak = score + 1
            setScore(streak)
            if (streak > best){
            window.localStorage.setItem('Racha', streak);
            }
            setTimeout(() => {
                setDigimonCheck(false)
                setDigimonSearch('')
            }, [3000])
        } else {
            DigimonRandom()
            whoIsThatDigimon()
        }
    },[digimonCheck])

    useEffect(() => {
        if (digimonSearch === digimonName.name) {
            setDigimonCheck(true)
        }
    },[digimonSearch]) 
 
    return (
        <div className="container digimon__container">
            <div className="row digimon__title text-center w-100">
                <h1>Who's that Digimon?</h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                <div className="digimon__background">
                {digimonCheck ?
                    <div className="digimon__cards--true">
                        <img src={digimonName.image} alt={digimonName.name} />
                    </div> 
                : 
                    <div className="digimon__cards--false">
                        <img src={digimonName.image} alt={digimonName.name} />
                    </div> 
                }
                </div>
                </div>
                <div className="col-md-12">
            <div className="digimon__input justify-content-center align-items-center">
                {digimonCheck && !lose ? 
                <h2 className="digimon__correcto">Correcto! Proximo Digimon en {timer}</h2>
                : 
                <h2 className="digimon__incorrect"></h2>
                }
                
                <label className="digimon__name">Nombe del Digimon</label>
                <input type="text" name="digimon_name" value={digimonSearch} onChange={e => {setDigimonSearch(e.target.value);} }></input>
                <label className="digimon__next" onClick={nextDigimon}>Buscar otro Digimon</label>       
            </div>
            </div>
            </div>
            <div className="row">
            <div className="col-6">
            <div className="digimon__puntuacion">
                <h1>{score}</h1>
                <label>Current</label>
            </div>
            </div>
            <div className="col-6">
            <div className="digimon__puntuacion--current">
                <h1>{best}</h1>
                <label>Best</label>
            </div>
            </div>
            </div>
        </div>
    )
}

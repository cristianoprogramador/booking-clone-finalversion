import { faBed, faPlane, faCar, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import './header.css'
import { DateRange } from 'react-date-range'
import { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'

const Header = ({ type }) => {
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const [openOptions, setOpenOptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const {dispatch} = useContext(SearchContext)

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH", payload:{destination, dates, options}})
    navigate('/hotels', {state:{destination, dates, options}})
  }

  return (
    <div className='header'>
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Hospedagens</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Voos</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Aluguel de Carro</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Atrações</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Táxi / Aeroporto</span>
          </div>
        </div>
        { type !== "list" && 
          <>
            <h1 className="headerTitle">Uma vida inteira de descontos? É genial!</h1>
            <p className="headerDesc">
              Pegue recompensas pelas suas viagens - destrave um desconto de 10% ou mais com uma conta CrisBooking
            </p>
            {!user && <button className="headerBtn">Entrar / Inscreva-se</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder='Onde você está indo?'
                  className='headerSearchInput'
                  onChange={e=>setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "dd/MM/yyyy")} até ${format(dates[0].endDate, "dd/MM/yyyy")} `}</span>
                {openDate && <DateRange
                  editableDateInputs={true}
                  onChange={item => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  minDate={new Date()}
                />}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adulto(s) - ${options.children} criança(s) - ${options.room} quarto(s)`}</span>
                {
                  openOptions && <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adulto</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton" onClick={() => handleOption('adult', 'd')}>-</button>
                        <span className="optionCounterNumber">{options.adult}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('adult', 'i')}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Criança</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton" onClick={() => handleOption('children', 'd')}>-</button>
                        <span className="optionCounterNumber">{options.children}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('children', 'i')}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Quarto</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton" onClick={() => handleOption('room', 'd')}>-</button>
                        <span className="optionCounterNumber">{options.room}</span>
                        <button className="optionCounterButton" onClick={() => handleOption('room', 'i')}>+</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
              <div className="headerSearchItem">
                <button className='headerBtn' onClick={handleSearch}>Procurar</button>
              </div>
            </div></>}
      </div>
    </div>

  )
}

export default Header
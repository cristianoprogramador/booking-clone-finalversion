import './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
      <h1 className='mailTitle'>Economize Tempo, Economize Dinheiro!</h1>
      <span className="mailDesc">Registre e receba as melhores promoções para você!</span>
      <div className="mailInputContainer">
        <input type="text" placeholder='Seu e-mail' />
        <button>Se inscreva</button>
      </div>
    </div>
  )
}

export default MailList
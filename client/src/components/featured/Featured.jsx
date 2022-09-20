import useFetch from '../../hooks/useFetch.js'
import './featured.css'

const Featured = () => {
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=berlin,madrid,london")

    return (
        <div className='featured' >
            {loading ? ("Carregando, por favor aguarde") : (<><div className="featuredItem">
                <img src="https://images.unsplash.com/photo-1549918864-48ac978761a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="featuredImg" />
                <div className="featuredTitles">
                    <h1>Berlin</h1>
                    <h2>{data[0]} acomodações </h2>
                </div>
            </div>
                <div className="featuredItem">
                    <img src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Madrid</h1>
                        <h2>{data[1]} acomodações</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Rio de Janeiro</h1>
                        <h2>{data[2]} acomodações</h2>
                    </div>
                </div></>)}
        </div>
    )
}

export default Featured
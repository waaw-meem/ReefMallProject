import style from "./index.module.scss"


const StoreLocatorComp = () => {
    return (
        <div className='section'>
            <div className="container">
                <iframe className={style.storeLocator} width={"100%"} height={500} src='/pointrmap.html' />
            </div>
        </div>
    )
}

export default StoreLocatorComp
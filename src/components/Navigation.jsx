import '../index.css';

function Navigation()
{
        return(
                <div className="
                        flex bg-(--bg) px-4 py-4 border-nav rounded-2xl mt-4 boxshadow-nav
                        overflow-hidden justify-between items-center relative z-500
                ">
                        <h1 className='
                                saudi-font mt-1 mb-0 ml-4 text-2xl flex
                        '>Engr. Osama Shaikh</h1>

                        <div className='
                                flex gap-6 mr-4 montserrat-font text-md
                        '>
                                <h2>Profile</h2>
                                <h2>Career</h2>
                                <h2>Leadership</h2>
                                <h2>Contact</h2>
                        </div>                        
                </div>
        );
}

export default Navigation;
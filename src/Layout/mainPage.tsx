
const mainPageDiv = {
    display: 'flex',
    width:'100%',
    height: '100%',
    'flex-direction' : 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    color: 'lightcoral',
    h1 : {
        fontSize: '54px'
    },
    p : {
        fontSize: '22px',
        marginTop: '5px'
    }
}
const MainPage:React.FC<{}> = () => {
    return (
        <div style={mainPageDiv}>
            <h1 style={mainPageDiv.h1}>Good to see you.</h1>
            <p style={mainPageDiv.p}>Enjoy My Fun Projects with React!</p>
        </div>
    );
}

export default MainPage;
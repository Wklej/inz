const Layer = ({num}) => {

    const divs = () => {
        let array = [];
        for (let index = 0; index < num; index++) {
            array.push(
                <div className="col">
                    <div className="container ps-1 pe-1">
                        <div className="col">
                            <div className="row p-5 bg-success text-light">main</div>
                            <div className="row p-1 my-1 bg-success text-light">params</div>
                        </div>
                    </div>
                </div>
            )
        }
        return array
    }

    return ( 
        divs()
     );
}
 
export default Layer;
import Table from '../table';
import Elev from '../elev';

const Home = () => {
    return (
        <>
            <h1>Klassekart</h1>
            <div id="class_map">
                <div className="class_row">
                    <Table>
                        <Elev name="Andreas"></Elev>
                        <Elev name="Ahmad"></Elev>
                    </Table>
                    <Table>
                        <Elev name="Philip"></Elev>
                        <Elev name="Tom"></Elev>
                    </Table>
                    <Table>
                        <Elev name="Gabriel"></Elev>
                        <Elev name="Theodor"></Elev>
                    </Table>
                </div>
                <div className="class_row">
                    <Table>
                        <Elev name="Silas"></Elev>
                        <Elev name="Alva"></Elev>
                        <Elev name="Mattis"></Elev>
                    </Table>
                    <Table>
                        <Elev name="Axel"></Elev>
                        <Elev name="Vetle"></Elev>
                        <Elev name="Kristoffer"></Elev>
                    </Table>
                    <Table>
                        <Elev name="Johannes"></Elev>
                        <Elev name="Elias"></Elev>
                        <Elev name="Matheo"></Elev>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default Home;
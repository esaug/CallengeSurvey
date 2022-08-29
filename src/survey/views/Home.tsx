import Hero from "../components/Hero";
import { useEffect } from "react";
import { useTask } from "../hooks/useSurvey";

const Home = () => {

    const { getSurvey } = useTask()


    useEffect(() => {
        getSurvey();
    }, [])
    return (
        <div>
            <Hero />
        </div>
    )
}

export default Home;
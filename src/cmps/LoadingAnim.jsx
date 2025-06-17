import Lottie from 'react-lottie';
import animationData from '../assets/animations/Loading.json';

export default function LoadingAnim() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className='lotti-container'>
            <Lottie
                options={defaultOptions}
            />
        </div>
    )
}
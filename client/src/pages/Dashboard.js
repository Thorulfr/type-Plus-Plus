import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import Modal from 'react-modal';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

import DashboardUserInfo from '../components/DashboardUserInfo';
// import Achievements from '../components/DashboardAchievements';
// import Progress from '../components/DashboardProgress'
import EditModal from '../components/EditModal';
import Friends from '../components/Friends';
import Uploader from '../components/Uploader'

import defaultPhoto from '../assets/images/no-profile-picture.svg'

// Modal Styles, remove later for custom styles
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const Dashboard = () => {
    let subtitle;
    const [image, setImage] = useState(defaultPhoto)
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalBio, setModalBio] = useState('');
    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME)

    // console.log(userParam)
    console.log(data);
    const user = data?.me || data?.user || {};

    // useEffect(() => {
    //     if (!loading) {
    //         const test = async (data) => {
    //             let pfp = await data?.me.profilePic
    //             console.log(pfp)
    //             setImage(pfp)
    //             console.log(pfp)
    //         }
    //         test()
    //     }
    // }, [data])


    // everything works except FIRST "return back to dashboard" renders defaultPhoto
    // useEffect(() => {
    //     const onCompleted = async (data) => {
    //         if (data) {
    //             if (data.me.profilePic !== null) {
    //                 setImage(data.me.profilePic)
    //             }
    //         }
    //     }
    //     onCompleted(data);
    // }, [data])


    // FIRST image upload doesn't work, following uploads do
    // useMemo(() => {
    //     if (data) {
    //         if (data.me.profilePic === null) {
    //             console.log(data)
    //             setImage(defaultPhoto)
    //         } else {
    //             setImage(data.me.profilePic);
    //         }
    //     }

    // }, [data])




    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/dashboard" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Auth.loggedIn()) {
        return <h4 className="flex-grow">Must be logged in</h4>;
    }



    return (
        <main className="flex-grow">
            <DashboardUserInfo
                data={data}
                modalBio={modalBio}
                setModalBio={setModalBio}
                image={image}
                setImage={setImage}
            />


            <div>
                <button onClick={openModal}>Edit Profile</button>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
                        Edit Profile
                    </h2>

                    <EditModal
                        data={data}
                        modalBio={modalBio}
                        setModalBio={setModalBio}
                        image={image}
                        setImage={setImage}
                    />
                    <button onClick={closeModal}>Done</button>
                </Modal>
            </div>
            <div>
                <h2>Friends</h2>
                <Friends friends={data.me.friends} />
            </div>
            <div>
                <Link to='/badges'><h2>Badge List</h2></Link>
            </div>
        </main>
    );
};

export default Dashboard;
import {useState, useContext, useEffect} from 'react';
import React from 'react';
import {UserContext} from '../Usercontext/UserContext';
import {AuthUser} from '../Usercontext/UserContext';
import "../styles/css/Users.css"
import Navbar from '../utilities/Navbar';
import {SideNav} from '../utilities/SideNav';
import {UserSummary} from '../utilities/UserSummary';
import Table from '../utilities/Table';
import Footer from '../utilities/Footer';


const Users = () => {
    const {userData} = useContext(UserContext);
    const [currentPage, setCurrentPage] = useState < number > (1);
    const [SelectPageOption, setSelectPageOption] = useState < number > (10);

    useEffect(() => {
        setCurrentPage(1);
    }, [SelectPageOption]);

    if (!userData) {
        return <div>
            Loading ...</div>;
    }

    const statuses: ('Active' | 'Pending' | 'Inactive' | 'Blacklisted')[] = ['Active', 'Pending', 'Inactive', 'Blacklisted'];

    const modifiedUserData = userData.map((prev : AuthUser) => ({
        ...prev,
        status: statuses[Math.floor(Math.random() * statuses.length)]
    }));

    const totalPages = Math.ceil(modifiedUserData.length / SelectPageOption);

    const handlePageClick = (pageNumber : number) => {
        setCurrentPage(pageNumber);
    };


    const startIndex = (currentPage - 1) * SelectPageOption;
    const endIndex = startIndex + SelectPageOption;
    const visibleItems = modifiedUserData.slice(startIndex, endIndex);


    return (
        <div className='Users'>
            <Navbar/>
            <div className='dashboard'>
                <div className="dashboard-wrapper">
                    <div id="side-nav">
                        <SideNav/>
                    </div>
                    <div className="users-data">
                        <div className="users-container">
                            <div className="user-summary">
                                <UserSummary/>
                            </div>
                            <div className="table"><Table visibleItems={visibleItems}/></div>
                            <div className="footer">
                                <Footer currentPage={currentPage}
                                    totalPages={totalPages}
                                    handlePageClick={handlePageClick}
                                    SelectPageOption={SelectPageOption}
                                    modifiedUserData={modifiedUserData}
                                    setSelectPageOption={setSelectPageOption}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;

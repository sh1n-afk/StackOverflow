import React, {useState, useEffect} from 'react';
import UserTopTags from '../../components/UserProfile/UserTopTags';
import QusPerDay from '../../components/admin/QuePerDay';
import PopularTag from '../../components/admin/PopularTag';
import { Container } from '@mui/material';
import Toolbar from "@mui/material/Toolbar";
import TopQues from '../../components/admin/TopQues';
import UserTop10 from '../../components/admin/UserTop10';
import SidebarAdmin from '../../components/admin/SidebarAdmin';

export default function AdminDashboard() {

    var tags = [{"_id":"test","count":53},{"_id":"javascript","count":24},{"_id":"react","count":22},{"_id":"python","count":18},{"_id":"java","count":18},{"_id":"html","count":14},{"_id":"css","count":10},{"_id":"php","count":8},{"_id":"js","count":7},{"_id":"hello","count":6},{"_id":"nodejs","count":6},{"_id":"mern","count":5},{"_id":"asd","count":5},{"_id":"React","count":4},{"_id":"Javascript","count":4},{"_id":"typescript","count":3},{"_id":"wow","count":3},{"_id":"question ","count":3},{"_id":"nextjs","count":3},{"_id":"c++","count":3},{"_id":"C++","count":3},{"_id":"sd","count":3},{"_id":"one","count":3},{"_id":"fg","count":2},{"_id":"golang","count":2}]

  return (
    <div>
    <Toolbar/>
    <Container maxWidth="md">
        <QusPerDay/>
        <PopularTag/>
        <TopQues/>
        <UserTop10/>
    </Container>
    </div>
  );
}

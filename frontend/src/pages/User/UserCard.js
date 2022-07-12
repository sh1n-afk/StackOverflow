import React from 'react'
import { Link } from 'react-router-dom';
import TagList from '../../components/ViewQuestion/TagList';

function UserCard(props) {
    const user = props.user
    console.log(user.tags);
    const userId = user._id; 
    let tagNames = [];
    user.tags.map(u => {
      tagNames.push(u.name);
    })
    console.log("tagNames",tagNames);
    // const userId = "62763e54bfe0a2faeddf026e"
    const redirectLink = `profile/${userId}`

    // const imageURL = `url(https://richhippos.com/wp-content/uploads/2021/12/jhik.jpeg)`
    const profilePicture = user.profilePicture
    const imageURL = `{url(${profilePicture})}`
    // console.log(user.tags.slice(0,2))  p
  return (
    <div className='tags-card'>
        <div className='tags-card-media'>
            <div className='tags-image-container' style={{backgroundImage: "url("+profilePicture+")", "width": "68px", "height": "68px"}}>
            </div>
        </div>
        <div className='tags-card-content'>
            <Link to={redirectLink} className='tags-customLink'>{user.username}</Link>
            {/* <p className='tags-margin0 tags-score'>{user.score}</p> */}
            <p className='tags-margin0 tags-score'>{user?.location?user.location.city+", "+user.location.country:""}</p>
            <p className='tags-margin0 tags-posts'>{user.reputation}</p>
            {/* <p className='tags-margin0 tags-score'>{<TagList tag={tagNames + " " + " "}></TagList>} </p> */}
            {/* <p className='tags-margin0 tags-score'><a href = '#'>{tagNames + " "}</a> </p> */}
        </div>
    </div>
  )
}

export default UserCard
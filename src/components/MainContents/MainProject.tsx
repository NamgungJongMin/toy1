import { useEffect, useState } from 'react';
import { projectCollection } from '../../firebase';
import { DocumentSnapshot, orderBy, query } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';

import '@scss/components/_mainProject.scss';

const MainProject = () => {
  const [posts, setPosts] = useState([]);
  const ref = query(projectCollection, orderBy('writeDate', 'desc'));
  const queryResult = useFirestoreQuery(['project'], ref, {
    subscribe: true,
  });
  const snapshot = queryResult.data;

  useEffect(() => {
    if (queryResult.isSuccess) {
      setPosts(snapshot?.docs);
    }
    console.log(posts[1]?.data());
  }, [queryResult.status]);

  return (
    <div className="mainP-container">
      <ul>
        {posts.map((docSnapshot, index) => {
          const { title, status } = docSnapshot?.data();
          if (index < 7) {
            return (
              <li className="mainP-item">
                <div className="mainP-item__title">{title}</div>
                <div className={`mainP-item__status ${status}`}>{status}</div>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default MainProject;

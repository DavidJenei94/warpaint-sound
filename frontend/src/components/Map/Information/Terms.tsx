import { useNavigate } from 'react-router-dom';

import CloseButton from '../../UI/CloseButton';

import styles from './Terms.module.scss';
import Modal from '../../UI/Modal/Modal';

const Terms = () => {
  const navigate = useNavigate();

  const handlOutsideClick = () => {
    navigate('/map');
  };

  return (
    <Modal
      backdrop={true}
      overlay={true}
      onClose={handlOutsideClick}
      style={{ width: '80%', height: '80%' }}
    >
      <>
        <CloseButton onClose={handlOutsideClick} />
        <div className={styles.container}>
          <h1>Terms and Conditions</h1>
          <p>
            By submitting a content (a 'Sound Record', inluding image and audio
            files), you provide appropriate licenses for its use. When you
            submit a content (the "Content") to this page, you grant Warpaint
            Sound and its developers (David Jenei, Warpaint Vision) a
            non-exclusive, worldwide, royalty-free, sublicensable, transferable
            right and license to use, host, store, cache, reproduce, publish,
            display (publicly or otherwise), perform (publicly or otherwise),
            distribute, transmit, modify, adapt (including, without limitation,
            in order to conform it to the requirements of any networks, devices,
            services, or media through which the Services are available), and
            create derivative works of the Content. The rights you grant in this
            license are for the purposes stated by Warpaint Sound on this page
            and can be used for further analysis and modelling by Warpaint Sound
            and its partners.
          </p>
          <p>
            You have all necessary licenses and permissions to submit this
            content and have it posted. You represent and warrant that you have
            all necessary rights, licenses, and permissions to grant the above
            licenses and that the Content submitted by you, and the submission
            of such Content, do not and will not violate any intellectual
            property rights (including but not limited to copyrights and
            trademark rights) of any third party. You agree that you will
            indemnify, defend, and hold harmless Warpaint Sound, its developers,
            its parents, subsidiaries, affiliates, customers, vendors, hosts,
            officers, and employees from any liability, damage or cost
            (including reasonable attorneys' fees and costs) from any claim or
            demand made by any third party due to violation of these
            representations and warranties, or otherwise arising out of any
            submitted Content.
          </p>
          <p>
            By submitting a Content, you provide the Content is harmless, not
            violent, does not contain any pornography and does not offend any
            ethnic group. You agree that a Content can be deleted in any case
            the Content violates these principles.
          </p>
        </div>
      </>
    </Modal>
  );
};

export default Terms;

'use client';

import { userState } from '@/app/_states/userState';
import ContainerLayout from '@/app/components/layout/layout';
import Modal from '@/app/components/modal/modal';
import BottomNavigation from '@/app/components/navigation/BottomNavigation';
import TopNavigation from '@/app/components/navigation/TopNavigation';
import InviteImg from '@/public/svgs/invite.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopyRounded';
import Image from 'next/image';
import { overlay } from 'overlay-kit';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const InvitePage = () => {
  const userData = useRecoilValue(userState);
  const homeId = userData.homeId;

  const copyToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        openModal();
      } catch (error) {
        console.error('클립보드 복사에 실패했습니다.', error);
      }
    } else {
      alert('이 브라우저는 클립보드 복사 기능을 지원하지 않습니다.');
    }
  };

  const shareLink = () => {
    const inviteUrl = `https://haru-puppy-frontend.vercel.app/auth/login?homeId=${homeId}`;
    copyToClipboard(inviteUrl);
  };

  const openModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal
        isOpen={isOpen}
        onClose={close}
        children='초대 링크가 클립보드에 복사되었습니다.'
        btn1='확인'
      />
    ));
  };

  return (
    <ContainerLayout>
      <TopNavigation />
      <InvitePageWrap>
        <Image src={InviteImg} alt='초대 이미지' />
        <InviteButtonWrap onClick={shareLink}>
          <ContentCopyIcon width={20} height={20} />
          초대 링크 복사하기
        </InviteButtonWrap>
      </InvitePageWrap>
      <BottomNavigation />
    </ContainerLayout>
  );
};

const InvitePageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7.5rem;
  margin-top: 7.5rem;
`;
const InviteButtonWrap = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 370px;
  height: 56px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: ${({ theme }) => theme.typo.semibold};
  background-color: #48d0f6;
  color: #ffffff;

  & > :nth-child(1) {
    margin: 0 50px 0 53px;
  }
`;

export default InvitePage;

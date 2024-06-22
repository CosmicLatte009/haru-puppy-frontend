import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import Image from 'next/image';
import instance from '@/app/_utils/apis/interceptors';
import { IReport } from '@/app/_types/user/Mate';

interface IReportCard {
    reports: IReport;
    userName: string;
}

const ReportCard = ({ reports, userName }: IReportCard) => {
    const [todayPooCount, setTodayPooCount] = useState(reports.todayPooCount);

    const reportsArray = [
        { title: '오늘의 배변활동', count: todayPooCount, unit: '회', icon: <Image src={'/svgs/poop.svg'} alt="배변활동 아이콘" width={30} height={30} /> },
        { title: '지난주 산책', count: reports.lastWalkCount, unit: '회', icon: <Image src={'/svgs/paw.svg'} alt="산책 아이콘" width={25} height={25} /> },
        { title: '마지막 목욕', count: reports.lastWash ? dayjs(reports.lastWash).format('MM.DD') : '-', icon: <Image src={'/svgs/dog_bath.svg'} alt="마지막 목욕 아이콘" width={30} height={30} /> },
        { title: '마지막 검진', count: reports.lastHospitalDate ? dayjs(reports.lastHospitalDate).format('MM.DD') : '-', icon: <Image src={'/svgs/dog_health_check.svg'} alt="마지막 검진 아이콘" width={30} height={30} /> },
    ];

    const onMinusClick = async () => {
        try {
            const response = await instance.delete('/api/schedules/complete', {
                data: { scheduleType: 'POO' }
            });
            console.log(response.data);

            setTodayPooCount(prevCount => Math.max(prevCount - 1, 0));
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    const onPlusClick = async () => {
        try {
            const response = await instance.post('/api/schedules/complete', {
                scheduleType: 'POO'
            });
            console.log(response.data);

            setTodayPooCount(prevCount => prevCount + 1);
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    return (
        <>
            <ReportCardWrapper>
                <Title>{userName}의 리포트</Title>

                {reportsArray.map((report, index) => (
                    <Wrapper key={index}>
                        <p>{report.title}</p>
                        <Info>
                            {report.title === '오늘의 배변활동' && <StyledIconButton src="/svgs/minus-svgrepo-com 1.svg" alt="minus icon" width={30} height={30} onClick={onMinusClick} />}
                            {report.icon}
                            <Count>
                                {report.count !== null && report.count !== 0 ? (
                                    <>
                                        {report.count}
                                        <p>{report.unit}</p>
                                    </>
                                ) : (
                                    '-'
                                )}
                            </Count>
                            {report.title === '오늘의 배변활동' && <StyledIconButton src="/svgs/plus-circle-svgrepo-com 1.svg" alt="plus icon" width={30} height={30} onClick={onPlusClick} />}
                        </Info>
                    </Wrapper>
                ))}
            </ReportCardWrapper>
        </>
    );
}

const StyledIconButton = styled(Image)`
    padding: 5px;
    border-radius: 50%;
    cursor: pointer;
`;

const ReportCardWrapper = styled.div`
    width: 370px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 20px;
`;

const Title = styled.span`
    font-size: 20px;
    grid-column: span 2; 
    text-align: start; 
    margin-bottom: 10px; 
`;

const Wrapper = styled.div`
    width: 156px;
    height: 84px;
    margin: 0 auto;
    border: 2px solid ${({ theme }) => theme.colors.black60};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.black90}
    }
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    svg {
        width: 40px; 
        height: 40px;
        fill: purple;    
    }
`;

const Count = styled.div`
    font-size: 28px;
    color: ${({ theme }) => theme.colors.black90};
    margin-left: 14px;
    display: flex;
    align-items: flex-end;
    padding-bottom: 5px;
    p {
        display: inline-block;
        font-size: 14px;
        margin-left: 5px;
        padding-bottom: 5px;
    }
`;

export default ReportCard;
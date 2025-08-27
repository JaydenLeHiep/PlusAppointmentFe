import React from 'react';
import {
    MainGrid,
    OverviewSection,
    AssignmentSection
} from '../../styles/CalculateMoney/CalculateMoneyViewStyles';
import OverviewPanel from './OverviewPanel';
import AssignmentPanel from './AssignmentPanel';

const CalculateMoneyView = ({ businessId, workSessions, earningsSummary, staff, currentWeek }) => {
    return (
        <MainGrid>
            <OverviewSection>
                <OverviewPanel businessId={businessId} currentWeek={currentWeek} />
            </OverviewSection>

            <AssignmentSection>
                <AssignmentPanel staff={staff} businessId={businessId} />
            </AssignmentSection>
        </MainGrid>
    );
};

export default CalculateMoneyView;
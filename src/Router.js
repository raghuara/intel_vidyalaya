import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashBoardLayout from "./Components/DashBoard/DashBoardLayout";
import DashBoardPage from "./Pages/DashBoardPage";
import NewsPage from "./Components/CommunicationComps/NewsPage";
import MessagesPage from "./Components/CommunicationComps/MessagesPage";
import CircularsPage from "./Components/CommunicationComps/CircularsPage";
import ConsentFormsPage from "./Components/CommunicationComps/ConsentFormsPage";
import TimeTablePage from "./Components/CommunicationComps/TimeTablesPage";
import HomeWorkPage from "./Components/CommunicationComps/HomeWorkPage";
import ExamTimeTablesPage from "./Components/CommunicationComps/ExamTimeTablesPage";
import StudyMaterialsPage from "./Components/CommunicationComps/StudyMaterialsPage";
import MarksResultsPage from "./Components/CommunicationComps/MarksResultsPage";
import ImportantEventsPage from "./Components/CommunicationComps/ImportantEventsPage";
import FeedBackPage from "./Components/CommunicationComps/FeedBackPage";
import AttendancePage from "./Components/CommunicationComps/AttendancePage";
import SchoolCalenderPage from "./Components/CommunicationComps/SchoolCalenderPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import AddAttendancePage from "./Components/CommunicationComps/AttendanceComps/AddAttendancePage";
import IrregularAttendeesPage from "./Components/CommunicationComps/AttendanceComps/IrregularAttendeese";
import CreateNewsPage from "./Components/CommunicationComps/NewsComps/CreateNewsPage";
import EditNewsPage from "./Components/CommunicationComps/NewsComps/EditNewsPage";
import CreateMessagePage from "./Components/CommunicationComps/MessageComps/CreateMessagePage";
import EditMessagePage from "./Components/CommunicationComps/MessageComps/EditMessagePage";
import TransportPage from "./Pages/TransportPage";
import ERPPage from "./Pages/ERPPage";
import CreateCircularsPage from "./Components/CommunicationComps/CircularsComps/CreateCircularsPage";
import EditCircularsPage from "./Components/CommunicationComps/CircularsComps/EditCircularsPage";
import CreateConsentFormsPage from "./Components/CommunicationComps/ConsentFormComps/CreateConsentFormsPage";
import EditConsentFormsPage from "./Components/CommunicationComps/ConsentFormComps/EditConsentFormsPage";
import ResponsesPage from "./Components/CommunicationComps/ConsentFormComps/ResponsesPage";
import AddMarksPage from "./Components/CommunicationComps/MarksComps/AddMarksPage";
import CreateTimeTablesPage from "./Components/CommunicationComps/TimeTablesComps/CreateTimeTable";
import EditTimeTablesPage from "./Components/CommunicationComps/TimeTablesComps/EditTimeTable";
import CreateHomeWorkPage from "./Components/CommunicationComps/HomeworkComps/CreateHomeWorkPage";
import EditHomeWorkPage from "./Components/CommunicationComps/HomeworkComps/EditHomeWorkPage";
import { fetchGradesData, selectGrades, selectGradesError, selectGradesLoading } from "./Redux/Slices/DropdownController";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Components/Loader";
import CreateExamTimeTablesPage from "./Components/CommunicationComps/ExamTimeTablesComps/CreateExamTimeTables";
import EditExamTimeTablesPage from "./Components/CommunicationComps/ExamTimeTablesComps/EditExamTimeTables";
import CreateStudyMaterialsPage from "./Components/CommunicationComps/StudyMaterialsComps/CreateStudyMaterials";
import EditStudyMaterialsPage from "./Components/CommunicationComps/StudyMaterialsComps/EditStudyMaterials";
import ViewMarksPage from "./Components/CommunicationComps/MarksComps/ViewMarksPage";
import ResponsesFeedBackPage from "./Components/CommunicationComps/FeedBackComps/ResponsesFeedBackPage";
import CreateFeedBackPage from "./Components/CommunicationComps/FeedBackComps/CreateFeedBackPage";
import QuestionsFeedBackPage from "./Components/CommunicationComps/FeedBackComps/QuestionsFeedBack";
import CreateTeacherTimeTablesPage from "./Components/CommunicationComps/TimeTablesComps/CreateTecherTimeTable";
import MyProjectPage from "./Components/MyProjects/MyProjects";
import SchedulePage from "./Components/MyProjects/SchedulePage";
import DraftPage from "./Components/MyProjects/DraftPage";
import ApprovalPage from "./Components/Approvals/ApprovalPage";
import NewsApprovalPage from "./Components/Approvals/ApprovalPages/NewsApprovalPage";
import ApprovalStatusPage from "./Components/MyProjects/ApprovalStatusPage";
import ApprovalStatusNewsPage from "./Components/MyProjects/ApprovalStatusComps/ApprovalStatusNews";
import ApprovalStatusMessagesPage from "./Components/MyProjects/ApprovalStatusComps/ApprovalStatusMessages";
import ApprovalStatusCircularsPage from "./Components/MyProjects/ApprovalStatusComps/ApprovalStatusCirculars";
import MessagesApprovalPage from "./Components/Approvals/ApprovalPages/MessagesApprovalPage";
import CircularsApprovalPage from "./Components/Approvals/ApprovalPages/CircularsApprovalPage";
import StudentPage from "./Pages/StudentPage";
import StudentInformationPage from "./Components/StudentComps/StudentsInformationPage";
import StudentInfoPage from "./Components/StudentComps/StudentInformationComps/StudentInfoPage";
import CreateStudentInfoPage from "./Components/StudentComps/StudentInformationComps/CreateStudentInfoPage";
import EditStudentInfoPage from "./Components/StudentComps/StudentInformationComps/EditStudentInfo";
import CreateStationaryDetailsPage from "./Components/StudentComps/CreateStationaryDetails";
import NewsApprovalEditPage from "./Components/Approvals/ApprovalPages/EditPages/NewsApprovalEditPage";
import MessagesApprovalEditPage from "./Components/Approvals/ApprovalPages/EditPages/MessagesApprovalEditPage";
import CircularsApprovalEditPage from "./Components/Approvals/ApprovalPages/EditPages/CircularApprovalEditPage";
import NewsDraftPage from "./Components/MyProjects/DraftComps/NewsComps/NewsDraftPage";
import NewsDraftEditPage from "./Components/MyProjects/DraftComps/NewsComps/NewsDraftEditPage";
import MessagesDraftPage from "./Components/MyProjects/DraftComps/MessagesComps/MessagesDraftPage";
import MessagesDraftEditPage from "./Components/MyProjects/DraftComps/MessagesComps/MessagesDraftEditPage";
import CircularsDraftPage from "./Components/MyProjects/DraftComps/CircularsComps/CircularsDraftPage";
import CircularsDraftEditPage from "./Components/MyProjects/DraftComps/CircularsComps/CircularsDraftEditPage";
import ConsentFormsDraftEditPage from "./Components/MyProjects/DraftComps/ConsentFormComps/ConsenFormDraftEditPage";
import ConsentFormDraftPage from "./Components/MyProjects/DraftComps/ConsentFormComps/ConsentFormDraftPage";
import ConsentFormDraftEditPage from "./Components/MyProjects/DraftComps/ConsentFormComps/ConsenFormDraftEditPage";
import MarksDraftPage from "./Components/MyProjects/DraftComps/MarksComps/MarksDraftPage";
import FeedBackDraftPage from "./Components/MyProjects/DraftComps/FeedBackComps/FeedBackDraftPage";
import FeedBackDraftEditPage from "./Components/MyProjects/DraftComps/FeedBackComps/FeedBackDraftEditPage";
import SoonPage from "./Components/Soon";
import FolderStudyMaterialsPage from "./Components/CommunicationComps/StudyMaterialsComps/FolderStudyMaterials";
import MainStudyMaterialsPage from "./Components/CommunicationComps/StudyMaterialsComps/MainStudyMaterials";
import ManagementPage from "./Components/DashBoard/ManagementPage";
import NotificationPage from "./Components/CommunicationComps/NotificationPage";
import DashboardCreatePage from "./Components/DashBoard/DashboardCreatePage";
import FeeFinancePage from "./Components/StudentComps/FeeFinanceComps/FeeFinancePage";
import CreateFeePage from "./Components/StudentComps/FeeFinanceComps/CreateFeePage";
import FeeGradeSelection from "./Components/StudentComps/FeeFinanceComps/FeeGradeSelection";
import FeeCategories from "./Components/StudentComps/FeeFinanceComps/FeeCategories";


export default function RouterPage() {
    const dispatch = useDispatch();
    const grades = useSelector(selectGrades);
    const loading = useSelector(selectGradesLoading);
    const error = useSelector(selectGradesError);

    useEffect(() => {
        dispatch(fetchGradesData());
    }, [dispatch]);

    // if (loading) return <div> <Loader /> </div>;
    // if (error) return <div> <Loader /> </div>;

    const startUrl = '/';
    return (
        <Routes>
            <Route path={startUrl} element={<LoginPage />}></Route>
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="dashboardmenu" element={<DashBoardLayout />}>
            <Route path="soon" element={<SoonPage />} />
                {/*Main Pages */}
                <Route path="dashboard" element={<DashBoardPage />} />
                <Route path="transport" element={<TransportPage />} />
                <Route path="erp" element={<ERPPage />} />
                <Route path="myprojects" element={<MyProjectPage />} />
                <Route path="approvals" element={<ApprovalPage />} />
                <Route path="dashboard/page" element={<ManagementPage />} />

                {/* Sub Pages */}

                {/* Communication */}
                <Route path="news" element={<NewsPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="circulars" element={<CircularsPage />} />
                <Route path="consentforms" element={<ConsentFormsPage />} />
                <Route path="timetables" element={<TimeTablePage />} />
                <Route path="homework" element={<HomeWorkPage />} />
                <Route path="examtimetables" element={<ExamTimeTablesPage />} />
                <Route path="studymaterials" element={<StudyMaterialsPage />} />
                <Route path="marks" element={<MarksResultsPage />} />
                <Route path="schoolcalendar" element={<SchoolCalenderPage />} />
                <Route path="events" element={<ImportantEventsPage />} />
                <Route path="feedback" element={<FeedBackPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="notification" element={<NotificationPage />} />


                {/* Sub Pages Branches*/}

                <Route path="dashboard/create" element={<DashboardCreatePage />} />


                <Route path="news/create" element={<CreateNewsPage />} />
                <Route path="news/edit" element={<EditNewsPage />} />

                <Route path="messages/create" element={<CreateMessagePage />} />
                <Route path="messages/edit" element={<EditMessagePage />} />

                <Route path="circulars/create" element={<CreateCircularsPage />} />
                <Route path="circulars/edit" element={<EditCircularsPage />} />

                <Route path="consentforms/create" element={<CreateConsentFormsPage />} />
                {/* <Route path="consentforms/edit" element={<EditConsentFormsPage />} /> */}
                <Route path="consentforms/responses" element={<ResponsesPage />} />

                <Route path="timetables/create" element={<CreateTimeTablesPage />} />
                <Route path="timetables/teachercreate" element={<CreateTeacherTimeTablesPage />} />
                <Route path="timetables/edit" element={<EditTimeTablesPage />} />

                <Route path="homework/create" element={<CreateHomeWorkPage />} />
                <Route path="homework/edit" element={<EditHomeWorkPage />} />

                <Route path="examtimetables/create" element={<CreateExamTimeTablesPage />} />
                <Route path="examtimetables/edit" element={<EditExamTimeTablesPage />} />

                <Route path="studymaterials/main" element={<MainStudyMaterialsPage />} />
                <Route path="studymaterials/folder" element={<FolderStudyMaterialsPage />} />
                <Route path="studymaterials/create" element={<CreateStudyMaterialsPage />} />
                <Route path="studymaterials/edit" element={<EditStudyMaterialsPage />} />

                <Route path="marks/addmarks" element={<AddMarksPage />} />
                <Route path="marks/view" element={<ViewMarksPage />} />

                <Route path="feedback/create" element={<CreateFeedBackPage />} />
                <Route path="feedback/responses" element={<ResponsesFeedBackPage />} />
                <Route path="feedback/questions" element={<QuestionsFeedBackPage />} />

                <Route path="attendance/addattendance" element={<AddAttendancePage />} />
                <Route path="attendance/irregular" element={<IrregularAttendeesPage />} />

                {/* Student */}
                <Route path="student" element={<StudentPage />} />
                <Route path="student/information" element={<StudentInformationPage />} />
                <Route path="student/information/viewinfo" element={<StudentInfoPage />} />
                <Route path="student/information/create" element={<CreateStudentInfoPage />} />
                <Route path="student/information/edit" element={<EditStudentInfoPage />} />
                
                {/* Student Fee & Finance */}
                <Route path="student/fee" element={<FeeFinancePage />} />
                <Route path="student/fee/grade" element={<FeeGradeSelection />} />
                <Route path="student/fee/categories" element={<FeeCategories />} />
                <Route path="student/fee/create" element={<CreateFeePage />} />
                <Route path="stationary/create" element={<CreateStationaryDetailsPage />} />

                {/* My Projects */}
                <Route path="schedule" element={<SchedulePage />} />
                <Route path="status" element={<ApprovalStatusPage />} />
                <Route path="draft" element={<DraftPage />} />

                <Route path="status/news" element={<ApprovalStatusNewsPage />} />
                <Route path="status/messages" element={<ApprovalStatusMessagesPage />} />
                <Route path="status/circulars" element={<ApprovalStatusCircularsPage />} />

                <Route path="draft/news" element={<NewsDraftPage />} />
                <Route path="draft/news/edit" element={<NewsDraftEditPage />} />

                <Route path="draft/messages" element={<MessagesDraftPage />} />
                <Route path="draft/messages/edit" element={<MessagesDraftEditPage />} />

                <Route path="draft/circulars" element={<CircularsDraftPage />} />
                <Route path="draft/circulars/edit" element={<CircularsDraftEditPage />} />

                <Route path="draft/consentforms" element={<ConsentFormDraftPage />} />
                <Route path="draft/consentforms/edit" element={<ConsentFormDraftEditPage />} />

                <Route path="draft/feedback" element={<FeedBackDraftPage />} />
                <Route path="draft/feedback/edit" element={<FeedBackDraftEditPage />} />

                {/* Approvals */}
                <Route path="approvals/news" element={<NewsApprovalPage />} />
                <Route path="approvals/messages" element={<MessagesApprovalPage />} />
                <Route path="approvals/circulars" element={<CircularsApprovalPage />} />

                <Route path="approvals/news/edit" element={<NewsApprovalEditPage />} />
                <Route path="approvals/messages/edit" element={<MessagesApprovalEditPage />} />
                <Route path="approvals/circulars/edit" element={<CircularsApprovalEditPage />} />

            </Route>
        </Routes>
    );
}
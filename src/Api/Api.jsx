// Production Link
const baseApiurl = `https://schoolcommunicationintelwebapi.azurewebsites.net/api/`;

// UAT Link
// const baseApiurl = `https://schoolcommunicationintelwebapi.azurewebsites.net/api/`;

const Login = `${baseApiurl}Login`;

// Common Apis 
const sectionsDropdown = `${baseApiurl}attendance/sectionsDropdown`;
const GettingGradesData = `${baseApiurl}GradeValueFetch/GettingGrades`;

// Dashboard 
const Dashboard = `${baseApiurl}Dashboard/`;
const GettingGrades = `${Dashboard}GettingGrades`;
const DashboardUsers = `${Dashboard}DashboardUsers`;
const DashboardManagement = `${Dashboard}DashboardManagement`;
const DashboardNews = `${Dashboard}DashboardNews&Circular`;
const DashboardBirthday = `${Dashboard}DashboardBirthday`;
const DashboardStudentsAttendance = `${Dashboard}DashboardStudentsAttendance`;
const DashboardTeachersAttendance = `${Dashboard}DashboardTeachersAttendance`;
const postDashboardSliders = `${baseApiurl}dashboardSliders/postDashboardSliders`;
const getDashboardSliders = `${baseApiurl}dashboardSliders/getDashboardSliders`;
const deleteDashboardSlider = `${baseApiurl}dashboardSliders/deleteDashboardSlider`;

// Communication 

// News
const News = `${baseApiurl}news/`;
const postNews = `${News}postNews`;
const ApprovalStatusNewsFetch = `${News}ApprovalStatusNewsFetch`;
const NewsFetch = `${News}NewsFetch`;
const NewsFetchDraft = `${News}NewsFetchDraft`;
const DeleteNewsApi = `${baseApiurl}changeNews/DeleteNews`;
const FindNews = `${baseApiurl}changeNews/FindNews`;
const updateNews = `${baseApiurl}changeNews/updateNews`;
const DeleteAllDraft = `${baseApiurl}changeNews/DeleteAllDraft`;
const updateNewsApprovalAction = `${baseApiurl}changeNews/updateNewsApprovalAction`;
const BulkDeleteNews = `${baseApiurl}changeNews/BulkDeleteNews`;

// Messages 
const Message = `${baseApiurl}Message/`;
const postMessage = `${Message}postMessage`;
const MessageFetch = `${Message}MessageFetch`;
const ApprovalStatusMessageFetch = `${Message}ApprovalStatusMessageFetch`;
const MessageFetchDraft = `${baseApiurl}message/MessageFetchDraft`;
const DeleteMessage = `${baseApiurl}changeMessage/DeleteMessage`;
const FindMessage = `${baseApiurl}changeMessage/FindMessage`;
const updateMessage = `${baseApiurl}changeMessage/updateMessage`;
const updateMessageApprovalAction = `${baseApiurl}changeMessage/updateMessageApprovalAction`;
const BulkDeleteMessage = `${baseApiurl}changeMessage/BulkDeleteMessage`;

// Circulars 
const circular = `${baseApiurl}circular/`;
const CircularFetch = `${circular}CircularFetch`;
const postCircular = `${circular}postCircular`;
const ApprovalStatusCircularFetch = `${circular}ApprovalStatusCircularFetch`;
const CircularFetchDraft = `${circular}CircularFetchDraft`;
const DeleteCircular = `${baseApiurl}changeCircular/DeleteCircular`;
const FindCircular = `${baseApiurl}changeCircular/FindCircular`;
const updateCircular = `${baseApiurl}changeCircular/updateCircular`;
const updateCircularApprovalAction = `${baseApiurl}changeCircular/updateCircularApprovalAction`;
const BulkDeleteCircular = `${baseApiurl}changeCircular/BulkDeleteCircular`;

// Consent Forms
const ConsentForm = `${baseApiurl}ConsentForm/`;
const postConsentForm = `${ConsentForm}postConsentForm`;
const ConsentFetchFetch = `${baseApiurl}/Consent/ConsentFetchFetch`;
const ConsentFetchFetchDradt = `${baseApiurl}/Consent/ConsentFetchFetchDradt`;
const DeleteConsentForm = `${baseApiurl}/Consent/DeleteConsentForm`;
const ConsentFormFetchAll = `${baseApiurl}/ConsentAll/ConsentFormFetchAll`;
const updateConsentForm = `${baseApiurl}/ConsentForm/updateConsentForm`;
const GetConsentFormById = `${baseApiurl}/feedBack/GetConsentFormById`;

// Time Tables
const timeTable = `${baseApiurl}timeTable/`;
const TimeTableFetch = `${timeTable}TimeTableFetch`;
const postTimeTable = `${timeTable}postTimeTable`;
const DeleteTimeTable = `${baseApiurl}changeTimetable/DeleteTimeTable`;
const FindTimeTable = `${baseApiurl}changeTimetable/FindTimeTable`;
const updateTimeTable = `${baseApiurl}changeTimetable/updateTimeTable`;
const fetchTeachersTimeTable = `${baseApiurl}teachersTimeTable/fetchTeachersTimeTable`;
const postTeachersTimeTable = `${baseApiurl}teachersTimeTable/postTeachersTimeTable`;
const updateTeachersTimeTable = `${baseApiurl}teachersTimeTable/updateTeachersTimeTable`;
const deleteTeachersTimeTable = `${baseApiurl}teachersTimeTable/deleteTeachersTimeTable`;

// Homework 
const homeWork = `${baseApiurl}homeWork/`;
const postHomeWork = `${homeWork}postHomeWork`;
const HomeWorkFetch = `${homeWork}HomeWorkFetch`;
const FindHomeWork = `${baseApiurl}changeHomeWork/FindHomeWork`;
const DeleteHomeWork = `${baseApiurl}changeHomeWork/DeleteHomeWork`;
const updateHomeWork = `${baseApiurl}changeHomeWork/updateHomeWork`; 
const fetchHomeworkStatus = `${baseApiurl}changeHomeWork/fetchHomeworkStatus`; 
const postHomeworkStatus = `${baseApiurl}changeHomeWork/postHomeworkStatus`; 
const updateHomeworkStatus = `${baseApiurl}changeHomeWork/updateHomeworkStatus`; 
const homeworkStatusReport = `${baseApiurl}changeHomeWork/homeworkStatusReport`; 

// Exam Time Tables 
const examtimetable = `${baseApiurl}examtimetable/`;
const postexamtimetable = `${examtimetable}postexamtimetable`;
const ExamTimeTableFetch = `${baseApiurl}ExamtimeTable/ExamTimeTableFetch`;
const FindExamTimeTable = `${baseApiurl}changeExamTimetable/FindExamTimeTable`;
const DeleteExamTimeTable = `${baseApiurl}changeExamTimetable/DeleteExamTimeTable`;
const updateExamTimeTable = `${baseApiurl}changeExamTimetable/updateExamTimeTable`;

// Study Materials
const studyMaterial = `${baseApiurl}studyMaterial/`;
const studyMaterialFolder = `${baseApiurl}studyMaterialFolder/`;
const getStudyMaterialFoldersByGrade = `${studyMaterialFolder}getStudyMaterialFoldersByGrade`;
const getStudyMaterialFolderById = `${studyMaterialFolder}getStudyMaterialFolderById`;
const deleteStudyMaterialFolder = `${studyMaterialFolder}deleteStudyMaterialFolder`;
const updateStudyMaterialFolder = `${studyMaterialFolder}updateStudyMaterialFolder`;
const postStudyMaterialFolder = `${baseApiurl}studyMaterialFolder/postStudyMaterialFolder`;
const poststudyMaterial = `${studyMaterial}poststudyMaterial`;
const StudyMaterialFetch = `${studyMaterial}StudyMaterialFetch`;
const FindStudyMaterial = `${baseApiurl}changeStudyMaterial/FindStudyMaterial`;
const DeleteStudyMaterial = `${baseApiurl}changeStudyMaterial/DeleteStudyMaterial`;
const updateStudyMaterial = `${baseApiurl}changeStudyMaterial/updateStudyMaterial`;

// Marks 
const marksStudent = `${baseApiurl}marksStudent/`;
const postMarks = `${baseApiurl}postMarks`;
const MarksStudentsFetch = `${marksStudent}MarksStudentsFetch`;
const fetchAllMarksStudents = `${baseApiurl}fetchAllMarksStudents`;

// School Calendar
const schoolCalender = `${baseApiurl}schoolCalender/`;
const postSchoolCalender = `${schoolCalender}postSchoolCalender`;
const FindSchoolCalender = `${baseApiurl}changeSchoolCalender/FindSchoolCalender`;
const DeleteSchoolCalender = `${baseApiurl}changeSchoolCalender/DeleteSchoolCalender`;
const updateSchoolCalender = `${baseApiurl}changeSchoolCalender/updateSchoolCalender`;
const FetchAllSchoolCalenderEvents = `${baseApiurl}changeSchoolCalender/FetchAllSchoolCalenderEvents`;

// Event
const eventCalender = `${baseApiurl}eventCalender/`;
const postEventCalender = `${eventCalender}postEventCalender`;
const FindEventCalender = `${baseApiurl}changeEventCalender/FindEventCalender`;
const DeleteEventCalender = `${baseApiurl}changeEventCalender/DeleteEventCalender`;
const updateEventCalender = `${baseApiurl}changeEventCalender/updateEventCalender`;
const FetchAllCalenderEvent = `${baseApiurl}changeEventCalender/FetchAllSchoolCalenderEvents`;

// Feedback
const feedBack = `${baseApiurl}feedBack/`;
const postFeedBack = `${baseApiurl}FeedBack/postFeedBack`;
const FeedBackFetchFetch = `${feedBack}FeedBackFetchFetch`;
const UpdateFeedBackSection = `${feedBack}UpdateFeedBackSection`;
const FeedBackFetchFetchDraft = `${feedBack}FeedBackFetchFetchDraft`;
const feedBackFetchAll = `${baseApiurl}feedBackAll/feedBackFetchAll`;
const DeleteFeedBackForm = `${feedBack}DeleteFeedBackForm`;
const parentsFeedBackFetchAll = `${baseApiurl}parentsFeedBack/parentsFeedBackFetchAll`;
const updateFeedBack = `${baseApiurl}FeedBack/updateFeedBack`;
const GetFeedBackDetailByID = `${baseApiurl}feedBack/GetFeedBackDetailByID`;
const parentsFeedbackAdminUpdate = `${baseApiurl}parentsFeedBack/parentsFeedbackAdminUpdate`;

// Attendance 
const Attendance = `${baseApiurl}attendance/`;
const barchart = `${Attendance}barchart`;
const piechart = `${Attendance}piechart`;
const attendanceSpecific = `${Attendance}attendanceSpecific`;
const attendanceTable = `${Attendance}attendanceTable`;
const irregularAttendees = `${Attendance}irregularAttendees`;
const fetchAttendance = `${Attendance}fetchAttendance`;
const postAttendance = `${Attendance}postAttendance`;
const updateAttendance = `${Attendance}updateAttendance`;
const postAttendanceMessage = `${Attendance}postAttendanceMessage`;
const attendanceReport = `${Attendance}attendanceReport`;
const postDairyStatus = `${baseApiurl}changeHomeWork/postDairyStatus`;
const postDresscodeStatus = `${baseApiurl}changeHomeWork/postDresscodeStatus`;
const fetchDairyStatus = `${baseApiurl}changeHomeWork/fetchDairyStatus`;
const fetchDressCodeStatus = `${baseApiurl}changeHomeWork/fetchDressCodeStatus`;
const updateDairyStatus = `${baseApiurl}changeHomeWork/updateDairyStatus`;
const updateDressCodeStatus = `${baseApiurl}changeHomeWork/updateDressCodeStatus`;
const dairyStatusReport = `${baseApiurl}changeHomeWork/dairyStatusReport`;
const dresscodeStatusReport = `${baseApiurl}changeHomeWork/dresscodeStatusReport`;

// Notification 
const notification = `${baseApiurl}notification/`;
const postNotification = `${notification}postNotification`;

// Student
// Student Infomation
const studentManagement = `${baseApiurl}studentManagement/`;
const postStudentAcademicInformation = `${studentManagement}postStudentAcademicInformation`;
const updateStudentAcademicInformation = `${studentManagement}updateStudentAcademicInformation`;
const postStudentInformation = `${studentManagement}postStudentInformation`;
const updateStudentInformation = `${studentManagement}updateStudentInformation`;
const postStudentFamilyInformation = `${studentManagement}postStudentFamilyInformation`;
const updateStudentFamilyInformation = `${studentManagement}updateStudentFamilyInformation`;
const postStudentGuardianInformation = `${studentManagement}postStudentGuardianInformation`;
const updateStudentGuardianInformation = `${studentManagement}updateStudentGuardianInformation`;
const postStudentSiblingInformation = `${studentManagement}postStudentSiblingInformation`;
const updateStudentSibilingInformation = `${studentManagement}updateStudentSibilingInformation`;
const postStudentDocumentInformation = `${studentManagement}postStudentDocumentInformation`;
const updateStudentDocumentInformation = `${studentManagement}updateStudentDocumentInformation`;
const postStudentgeneralhealthInformation = `${studentManagement}postStudentgeneralhealthInformation`;
const updateStudentgeneralhealthInformation = `${studentManagement}updateStudentgeneralhealthInformation`;
const FindStudentManagementDetails = `${studentManagement}FindStudentManagementDetails`;
const GetStudentsInformation = `${studentManagement}GetStudentsInformation`;

export {
    poststudyMaterial,
    fetchHomeworkStatus,
    updateHomeworkStatus,
    fetchDairyStatus,
    updateDairyStatus,
    fetchDressCodeStatus,
    updateDressCodeStatus,
    homeworkStatusReport,
    dairyStatusReport,
    dresscodeStatusReport,
    deleteDashboardSlider,
    postHomeworkStatus,
    BulkDeleteCircular,
    postDairyStatus,
    postDresscodeStatus,
    attendanceReport,
    BulkDeleteNews,
    BulkDeleteMessage,
    postNotification,
    getDashboardSliders,
    postDashboardSliders,
    updateStudyMaterialFolder,
    getStudyMaterialFolderById,
    postStudyMaterialFolder,
    getStudyMaterialFoldersByGrade,
    deleteStudyMaterialFolder,
    parentsFeedbackAdminUpdate,
    GetFeedBackDetailByID,
    updateConsentForm,
    GetConsentFormById,
    postAttendanceMessage,
    NewsFetchDraft,
    updateFeedBack,
    MessageFetchDraft,
    CircularFetchDraft,
    DeleteAllDraft,
    ConsentFetchFetchDradt,
    postStudentSiblingInformation,
    FeedBackFetchFetchDraft,
    updateStudentSibilingInformation,
    updateStudentAcademicInformation,
    GetStudentsInformation,
    FindStudentManagementDetails,
    updateStudentgeneralhealthInformation,
    postStudentDocumentInformation,
    updateStudentDocumentInformation,
    updateStudentGuardianInformation,
    postStudentgeneralhealthInformation,
    postStudentFamilyInformation,
    updateStudentInformation,
    postStudentInformation,
    updateStudentFamilyInformation,
    postStudentGuardianInformation,
    postTeachersTimeTable,
    deleteTeachersTimeTable,
    updateTeachersTimeTable,
    postMarks,
    updateEventCalender,
    fetchTeachersTimeTable,
    FetchAllCalenderEvent,
    fetchAllMarksStudents,
    FindEventCalender,
    postEventCalender,
    DeleteEventCalender,
    postSchoolCalender,
    parentsFeedBackFetchAll,
    UpdateFeedBackSection,
    FindSchoolCalender,
    feedBackFetchAll,
    DeleteFeedBackForm,
    DeleteSchoolCalender,
    postFeedBack,
    FeedBackFetchFetch,
    StudyMaterialFetch,
    updateStudyMaterial,
    DeleteStudyMaterial,
    FindStudyMaterial,
    Login,
    Dashboard,
    DashboardUsers,
    DashboardManagement,
    DashboardNews,
    DashboardBirthday,
    DashboardTeachersAttendance,
    DashboardStudentsAttendance,
    updateSchoolCalender,
    barchart, piechart,
    sectionsDropdown,
    attendanceSpecific,
    attendanceTable,
    irregularAttendees,
    fetchAttendance,
    postAttendance,
    updateAttendance,
    postNews,
    NewsFetch,
    DeleteNewsApi,
    FindNews,
    updateNews,
    GettingGrades,
    postMessage,
    MessageFetch,
    DeleteMessage,
    FindMessage,
    updateMessage,
    CircularFetch,
    DeleteCircular,
    postCircular,
    FindCircular,
    updateCircular,
    TimeTableFetch,
    DeleteTimeTable,
    postTimeTable,
    FindTimeTable,
    updateTimeTable,
    postHomeWork,
    FindHomeWork,
    DeleteHomeWork,
    HomeWorkFetch,
    updateHomeWork,
    GettingGradesData,
    postexamtimetable,
    FindExamTimeTable,
    DeleteExamTimeTable,
    updateExamTimeTable,
    ExamTimeTableFetch,
    postConsentForm,
    ConsentFetchFetch,
    ConsentFormFetchAll,
    DeleteConsentForm,
    MarksStudentsFetch,
    FetchAllSchoolCalenderEvents,
    ApprovalStatusNewsFetch,
    updateNewsApprovalAction,
    ApprovalStatusMessageFetch,
    updateMessageApprovalAction,
    ApprovalStatusCircularFetch,
    updateCircularApprovalAction,
    postStudentAcademicInformation
}
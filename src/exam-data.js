export const examsData = [
    {
        semester: 'Semester 1',
        examTitles: [
            {
                title: 'Regular Exams',
                examTypes: [
                    {
                        type: 'UT',
                        department: [
                            {
                                name: 'IT',
                                examDetails: [
                                    {
                                        subject: 'Subject A',
                                        date: '2024-03-10',
                                        startTime: '9:00 AM',
                                        endTime: '11:00 AM',
                                        location: 'Exam Hall 1'
                                    },
                                    {
                                        subject: 'Subject B',
                                        date: '2024-03-12',
                                        startTime: '10:00 AM',
                                        endTime: '12:00 PM',
                                        location: 'Exam Hall 2'
                                    }
                                ]
                            },
                            {
                                name: 'CE',
                                examDetails: [
                                    {
                                        subject: 'Subject C',
                                        date: '2024-03-15',
                                        startTime: '9:30 AM',
                                        endTime: '11:30 AM',
                                        location: 'Exam Hall 3'
                                    },
                                    {
                                        subject: 'Subject D',
                                        date: '2024-03-18',
                                        startTime: '11:00 AM',
                                        endTime: '1:00 PM',
                                        location: 'Exam Hall 4'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'Insem',
                        department: [
                            {
                                name: 'IT',
                                examDetails: [
                                    {
                                        subject: 'Subject C',
                                        date: '2024-03-15',
                                        startTime: '9:30 AM',
                                        endTime: '11:30 AM',
                                        location: 'Exam Hall 3'
                                    },
                                    {
                                        subject: 'Subject D',
                                        date: '2024-03-18',
                                        startTime: '11:00 AM',
                                        endTime: '1:00 PM',
                                        location: 'Exam Hall 4'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'Practical',
                        department: [{
                            name: 'IT',
                            examDetails: [
                                {
                                    subject: 'Practical A',
                                    date: '2024-03-20',
                                    startTime: '9:00 AM',
                                    endTime: '12:00 PM',
                                    location: 'Lab 1'
                                }
                            ]
                        }]
                    }
                ]
            },
            {
                title: 'Backlog Exams',
                examTypes: [
                    {
                        type: 'Endsem',
                        department: [{
                            name: 'IT',
                            examDetails: [
                                {
                                    subject: 'Subject E',
                                    date: '2024-03-20',
                                    startTime: '10:30 AM',
                                    endTime: '12:30 PM',
                                    location: 'Exam Hall 5'
                                },
                                {
                                    subject: 'Subject F',
                                    date: '2024-03-22',
                                    startTime: '12:00 PM',
                                    endTime: '2:00 PM',
                                    location: 'Exam Hall 6'
                                }
                            ]
                        }]
                    },
                    {
                        type: 'Practical',
                        department: [{
                            name: 'IT',
                            examDetails: [
                                {
                                    subject: 'Practical A',
                                    date: '2024-03-20',
                                    startTime: '9:00 AM',
                                    endTime: '12:00 PM',
                                    location: 'Lab 1'
                                }
                            ]
                        }]
                    }
                ]
            }
        ]
    },
    {
        semester: 'Semester 2',
        examTitles: [
            {
                title: 'Backlog Exams',
                examTypes: [
                    {
                        type: 'Endsem',
                        department: [{
                            name: 'IT',
                            examDetails: [
                                {
                                    subject: 'Subject X',
                                    date: '2024-03-25',
                                    startTime: '9:30 AM',
                                    endTime: '11:30 AM',
                                    location: 'Exam Hall 7'
                                },
                                {
                                    subject: 'Subject Y',
                                    date: '2024-03-28',
                                    startTime: '10:00 AM',
                                    endTime: '12:00 PM',
                                    location: 'Exam Hall 8'
                                }
                            ]
                        }]
                    }
                ]
            }
        ]
    }
];

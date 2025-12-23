/**
 * Study Template - For study sessions, exam preparation, and learning
 */

export const studyTemplate = {
  id: 'study',
  name: 'Study',
  icon: '📚',
  color: 'green',
  description: 'Plan study sessions, exam prep, and learning activities',
  fields: {
    title: 'Study Session',
    description: '📖 Study Plan:\n• Review lecture notes\n• Read chapters 1-3\n• Practice problems\n• Create summary notes\n\n⏱️ Duration: 2 hours\n🎯 Goal: Master key concepts',
    priority: 'medium',
  },
  variations: [
    {
      name: 'Exam Preparation',
      title: 'Exam Preparation',
      description: '📝 Exam Prep:\n• Review all course materials\n• Practice past papers\n• Focus on weak areas\n• Create formula sheets\n\n📅 Exam Date: [Add date]\n⏱️ Study Time: 3-4 hours',
      priority: 'high',
    },
    {
      name: 'Assignment Work',
      title: 'Complete Assignment',
      description: '📄 Assignment Tasks:\n• Read assignment requirements\n• Research and gather materials\n• Create outline\n• Write draft\n• Review and submit\n\n📅 Due Date: [Add date]',
      priority: 'high',
    },
    {
      name: 'Practice Session',
      title: 'Practice & Review',
      description: '✍️ Practice Plan:\n• Solve practice problems\n• Review mistakes\n• Understand concepts\n• Take notes\n\n⏱️ Duration: 1.5 hours',
      priority: 'medium',
    },
  ],
  metadata: {
    category: 'Education',
    suggestedDuration: '2 hours',
    reminder: '30 minutes before',
  },
};

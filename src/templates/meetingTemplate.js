/**
 * Meeting Template - For team meetings, client calls, and discussions
 */

export const meetingTemplate = {
  id: 'meeting',
  name: 'Meeting',
  icon: '👥',
  color: 'blue',
  description: 'Schedule team meetings, client calls, and discussions',
  fields: {
    title: 'Team Meeting',
    description: '📋 Agenda:\n• Project status update\n• Discussion points\n• Action items\n\n⏰ Duration: 1 hour\n👥 Attendees: Team members',
    priority: 'medium',
  },
  variations: [
    {
      name: 'Team Standup',
      title: 'Daily Standup Meeting',
      description: '📋 Agenda:\n• What did you do yesterday?\n• What will you do today?\n• Any blockers?\n\n⏰ Duration: 15 minutes',
      priority: 'medium',
    },
    {
      name: 'Client Meeting',
      title: 'Client Meeting',
      description: '📋 Agenda:\n• Project progress review\n• Client feedback\n• Next milestones\n• Q&A session\n\n⏰ Duration: 1 hour',
      priority: 'high',
    },
    {
      name: 'Sprint Planning',
      title: 'Sprint Planning Meeting',
      description: '📋 Agenda:\n• Review sprint goals\n• Task estimation\n• Sprint backlog creation\n• Team capacity planning\n\n⏰ Duration: 2 hours',
      priority: 'high',
    },
  ],
  metadata: {
    category: 'Work',
    suggestedDuration: '1 hour',
    reminder: '15 minutes before',
  },
};

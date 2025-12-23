/**
 * Personal Template - For personal tasks, errands, and self-care
 */

export const personalTemplate = {
  id: 'personal',
  name: 'Personal',
  icon: '🎯',
  color: 'pink',
  description: 'Manage personal tasks, errands, and self-care activities',
  fields: {
    title: 'Personal Task',
    description: '✅ Task Details:\n• Add specific task details\n• Set personal goals\n• Track progress\n\n💡 Note: Take your time and stay organized',
    priority: 'low',
  },
  variations: [
    {
      name: 'Workout',
      title: 'Workout Session',
      description: '💪 Workout Plan:\n• Warm-up (10 min)\n• Main workout (30-45 min)\n• Cool down & stretch (10 min)\n\n🎯 Focus: Stay consistent\n💧 Remember to hydrate',
      priority: 'medium',
    },
    {
      name: 'Shopping',
      title: 'Shopping List',
      description: '🛒 Shopping Items:\n• Groceries\n• Household items\n• Personal care\n\n📝 Don\'t forget:\n• Check pantry before leaving\n• Bring reusable bags',
      priority: 'low',
    },
    {
      name: 'Self Care',
      title: 'Self-Care Time',
      description: '🌟 Self-Care Activities:\n• Meditation (15 min)\n• Reading (30 min)\n• Hobby time\n• Relaxation\n\n💆 Remember: You deserve this time!',
      priority: 'medium',
    },
    {
      name: 'Home Chores',
      title: 'Home Maintenance',
      description: '🏠 Chores:\n• Clean living room\n• Organize workspace\n• Laundry\n• Kitchen cleanup\n\n⏱️ Estimated time: 1-2 hours',
      priority: 'low',
    },
  ],
  metadata: {
    category: 'Personal',
    suggestedDuration: 'Flexible',
    reminder: '1 hour before',
  },
};

import { Conversations, UserId, Conversation } from '../../types'

interface SetUserIdAction {
  type: 'SET_USER_ID'
  userId: UserId
}

interface SetConversationsAction {
  type: 'SET_CONVERSATIONS'
  conversations: Conversations
}

interface SetConversationSelectedIdAction {
  type: 'SET_CONVERSATION_SELECTED_ID'
  conversationSelectedId: string
}

interface UpdateConversationsAction {
  type: 'UPDATE_CONVERSATIONS'
  conversations: Conversations
}

export type GeneralActions =
  | SetUserIdAction
  | SetConversationsAction
  | SetConversationSelectedIdAction
  | UpdateConversationsAction

export const setUserId = (userId: UserId): SetUserIdAction => {
  return { type: 'SET_USER_ID', userId }
}

export const setConversations = (
  conversations: Conversations
): SetConversationsAction => {
  return { type: 'SET_CONVERSATIONS', conversations }
}

export const setConversationSelectedId = (
  conversationId: string
): SetConversationSelectedIdAction => {
  return {
    type: 'SET_CONVERSATION_SELECTED_ID',
    conversationSelectedId: conversationId,
  }
}

export const updateConversations = (
  conversations: Conversations,
  newConversation: Conversation
): UpdateConversationsAction => {
  const conversationIndex = conversations.findIndex(
    (conversation) => conversation._id === newConversation._id
  )

  let conversationsUpdated

  if (conversationIndex !== -1) {
    conversationsUpdated = conversations.map((conversation, index) => ({
      ...conversation,
      messages:
        index === conversationIndex
          ? newConversation.messages
          : [...conversation.messages],
    }))
  } else {
    conversationsUpdated = [...conversations]

    conversationsUpdated.push(newConversation)
  }

  return {
    type: 'UPDATE_CONVERSATIONS',
    conversations: conversationsUpdated,
  }
}
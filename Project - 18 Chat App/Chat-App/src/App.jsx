import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { FaGoogle, FaSignOutAlt, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

function App() {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [usersOnline, setUsersOnline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    const fetchSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setError(null);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load session. Please refresh the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setMessages([]);
        setUsersOnline([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) return;

    const channel = supabase.channel('room:one', {
      config: {
        presence: {
          key: session.user.id,
        },
      },
    });

    channel.on('broadcast', { event: 'message' }, (payload) => {
      setMessages((prev) => [...prev, payload]);
    });

    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      setUsersOnline(Object.values(state));
    });

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        try {
          await channel.track({
            user: session.user.id,
            user_metadata: {
              full_name: session.user.user_metadata.full_name,
              avatar_url: session.user.user_metadata.avatar_url,
            },
          });
        } catch (err) {
          console.error('Error tracking presence:', err);
          setError('Failed to connect to chat. Please refresh.');
        }
      }
    });

    channelRef.current = channel;

    const loadMessages = async () => {
      try {
        const { data } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (data) {
          setMessages(data.map(msg => ({
            payload: {
              ...msg,
              timestamp: msg.created_at
            }
          })));
        }
      } catch (err) {
        console.error('Error loading messages:', err);
        setError('Failed to load message history.');
      }
    };

    loadMessages();

    return () => {
      channel.unsubscribe();
    };
  }, [session]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const signIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !session || !channelRef.current) return;

    const messageData = {
      user: session.user.id,
      message: newMessage.trim(),
      user_metadata: {
        full_name: session.user.user_metadata.full_name,
        avatar_url: session.user.user_metadata.avatar_url,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      setMessages(prev => [...prev, { payload: messageData }]);
      await channelRef.current.send({ type: 'broadcast', event: 'message', payload: messageData });

      const { error: insertError } = await supabase.from('messages').insert([{
        user: messageData.user,
        message: messageData.message,
        user_metadata: messageData.user_metadata,
        created_at: messageData.timestamp,
      }]);

      if (insertError) {
        console.error('Error inserting message:', insertError);
      } else {
        setNewMessage('');
      }
    } catch (err) {
      console.error('Error sending message:', err);
    }
    setNewMessage('');
  };

  if (loading && !session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-indigo-600 mb-4 mx-auto" />
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to ChatApp</h1>
          <p className="text-gray-600 mb-8">Sign in with Google to start chatting</p>
          <button
            onClick={signIn}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out flex items-center justify-center mx-auto disabled:opacity-70"
          >
            {loading ? <FaSpinner className="animate-spin mr-3" /> : <FaGoogle className="mr-3" />}
            Sign In with Google
          </button>
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-3 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={session.user?.user_metadata?.avatar_url || 'https://avatar.vercel.sh/unknown'}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
              onError={(e) => {
                e.target.src = 'https://avatar.vercel.sh/unknown';
              }}
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h2 className="font-medium text-gray-800">
              {session.user?.user_metadata?.full_name || 'User'}
            </h2>
            <p className="text-xs text-gray-500">
              {usersOnline.length} {usersOnline.length === 1 ? 'person' : 'people'} online
            </p>
          </div>
        </div>

        {/* Signout Dropdown */}
        <div className="relative group">
          <button className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <BsThreeDotsVertical />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <button
              onClick={signOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Sign Out
            </button>
          </div>
        </div>

      </header>

      {/* Chat Content */}
      <main className="flex-grow p-4 overflow-y-auto scroll-smooth bg-gradient-to-b from-white to-gray-50">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <p>{error}</p>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-indigo-100 p-6 rounded-full mb-4">
              <FaPaperPlane className="text-indigo-600 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No messages yet</h3>
            <p className="text-gray-500 max-w-md">
              Be the first to send a message and start the conversation!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex space-x-3 items-start">
                <img
                  src={msg.payload.user_metadata?.avatar_url || 'https://avatar.vercel.sh/unknown'}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {msg.payload.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-gray-700">{msg.payload.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        )}
      </main>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="bg-white px-4 py-3 flex items-center space-x-3 border-t">
        <input
          type="text"
          className="flex-grow border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
        >
          <IoMdSend />
        </button>
      </form>
    </div>
  );
}

export default App;

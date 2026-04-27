import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Textarea } from '@/app/components/ui/textarea';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Mail, MailOpen, Trash2, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { contactAPI } from '@/lib/api';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export default function ContactMessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await contactAPI.list({ 
        unread_only: showUnreadOnly 
      });
      setMessages(response.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [showUnreadOnly]);

  const handleMarkAsRead = async (messageId: number, isRead: boolean) => {
    try {
      await contactAPI.update(messageId, { is_read: isRead });
      fetchMessages();
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to update message');
    }
  };

  const handleMarkAsReplied = async (messageId: number, isReplied: boolean) => {
    try {
      await contactAPI.update(messageId, { is_replied: isReplied });
      fetchMessages();
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to update message');
    }
  };

  const handleSaveNotes = async (messageId: number) => {
    try {
      await contactAPI.update(messageId, { admin_notes: adminNotes });
      fetchMessages();
      setSelectedMessage(null);
      setAdminNotes('');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to save notes');
    }
  };

  const handleDelete = async (messageId: number) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await contactAPI.delete(messageId);
      fetchMessages();
      setSelectedMessage(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to delete message');
    }
  };

  const openMessageDialog = (message: ContactMessage) => {
    setSelectedMessage(message);
    setAdminNotes(message.admin_notes || '');
    if (!message.is_read) {
      handleMarkAsRead(message.id, true);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Contact Messages</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage contact form submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={showUnreadOnly ? 'default' : 'outline'}
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            <Mail className="w-4 h-4 mr-2" />
            {showUnreadOnly ? 'Show All' : `Unread (${unreadCount})`}
          </Button>
          <Button variant="outline" onClick={fetchMessages}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Alert className="border-red-500 bg-red-50 dark:bg-red-950">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              {showUnreadOnly ? 'No unread messages' : 'No messages yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !message.is_read ? 'border-blue-500 border-2' : ''
              }`}
              onClick={() => openMessageDialog(message)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {!message.is_read ? (
                        <Mail className="w-5 h-5 text-blue-600" />
                      ) : (
                        <MailOpen className="w-5 h-5 text-gray-400" />
                      )}
                      <CardTitle className="text-lg">{message.subject}</CardTitle>
                    </div>
                    <CardDescription>
                      From: <strong>{message.name}</strong> ({message.email})
                      <br />
                      {new Date(message.created_at).toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {!message.is_read && (
                      <Badge variant="default">New</Badge>
                    )}
                    {message.is_replied && (
                      <Badge variant="secondary">Replied</Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                  {message.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <DialogDescription>
                  From: {selectedMessage.name} ({selectedMessage.email})
                  <br />
                  Received: {new Date(selectedMessage.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Message:</h4>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Admin Notes:</h4>
                  <Textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes about this message..."
                    rows={4}
                  />
                  <Button
                    onClick={() => handleSaveNotes(selectedMessage.id)}
                    className="mt-2"
                    size="sm"
                  >
                    Save Notes
                  </Button>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleMarkAsReplied(selectedMessage.id, !selectedMessage.is_replied)
                    }
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedMessage.is_replied ? 'Mark as Not Replied' : 'Mark as Replied'}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Reply via Email
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

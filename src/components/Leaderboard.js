import React, { useState } from 'react';
import { mockData } from './data/data';

const Leaderboard = () => {
  const [data, setData] = useState(mockData);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: '', score: 0 });

  const handleEdit = (id) => {
    setEditMode(id);
    const user = data.find((item) => item.id === id);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    const updatedData = data.map((item) =>
      item.id === editMode ? { ...item, ...editedUser } : item
    );
    setData(updatedData);
    console.log('API Payload:', editedUser); // Log payload for API submission
    setEditMode(null);
  };

  const handleShare = (platform, name, score) => {
    const message = `🔥 Wow! Lihat skor ${name} di leaderboard: ${score} poin! Ayo coba kalahkan skornya! 💪🎮`;
    const encodedMessage = encodeURIComponent(message);
    let url = '';

    switch (platform) {
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${window.location.href}&text=${encodedMessage}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        break;
      case 'instagram':
        alert(
          "Maaf, Instagram tidak mendukung fitur share langsung melalui link. Silakan bagikan skor Anda secara manual melalui aplikasi Instagram!"
        );
        return;
      default:
        break;
    }
    window.open(url, '_blank');
  };

  return (
    <div>
      <h1>Leaderboard 📊</h1>
      {data.map((user) => (
        <div key={user.id} style={{ margin: '10px', border: '1px solid black', padding: '10px' }}>
          {editMode === user.id ? (
            <>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
              <input
                type="number"
                value={editedUser.score}
                onChange={(e) => setEditedUser({ ...editedUser, score: Number(e.target.value) })}
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <img src={user.photo_url} alt={user.name} width="50" />
              <p>Name: {user.name}</p>
              <p>Score: {user.score}</p>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleShare('whatsapp', user.name, user.score)}>Share WhatsApp</button>
              <button onClick={() => handleShare('telegram', user.name, user.score)}>Share Telegram</button>
              <button onClick={() => handleShare('facebook', user.name, user.score)}>Share Facebook</button>
              <button onClick={() => handleShare('instagram', user.name, user.score)}>Share Instagram</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;

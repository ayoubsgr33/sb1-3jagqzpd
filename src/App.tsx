import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaFutbol, FaChartLine, FaHistory, FaStar } from 'react-icons/fa';
import { supabase } from './supabaseClient';
import { format } from 'date-fns';

interface MatchEvent {
  id: number;
  minute: number;
  type: 'goal' | 'card' | 'substitution';
  description: string;
}

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  score: string;
  status: 'live' | 'upcoming' | 'finished';
  startTime: string;
  events: MatchEvent[];
  analysis: string;
  possession: {
    home: number;
    away: number;
  };
  shots: {
    home: number;
    away: number;
  };
}

function App() {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      homeTeam: 'Real Madrid',
      awayTeam: 'Barcelona',
      score: '2-1',
      status: 'live',
      startTime: '2023-10-28T20:00:00Z',
      events: [
        { id: 1, minute: 23, type: 'goal', description: 'Goal! Vinicius Jr scores for Real Madrid!' },
        { id: 2, minute: 35, type: 'card', description: 'Yellow card shown to Gavi' },
        { id: 3, minute: 42, type: 'goal', description: 'Goal! Lewandowski equalizes for Barcelona!' },
        { id: 4, minute: 67, type: 'goal', description: 'Goal! Bellingham puts Real Madrid ahead!' }
      ],
      analysis: 'Real Madrid dominating the midfield with Bellingham and Kroos controlling the tempo. Barcelona struggling to maintain possession in dangerous areas.',
      possession: { home: 55, away: 45 },
      shots: { home: 12, away: 8 }
    },
    {
      id: 2,
      homeTeam: 'Manchester City',
      awayTeam: 'Liverpool',
      score: '1-1',
      status: 'live',
      startTime: '2023-10-28T20:00:00Z',
      events: [
        { id: 1, minute: 15, type: 'goal', description: 'Goal! Haaland strikes for City!' },
        { id: 2, minute: 45, type: 'goal', description: 'Goal! Salah equalizes for Liverpool!' }
      ],
      analysis: 'High-intensity match with both teams pressing aggressively. City controlling possession but Liverpool dangerous on the counter.',
      possession: { home: 62, away: 38 },
      shots: { home: 15, away: 7 }
    }
  ]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black">
        {/* Navigation */}
        <nav className="bg-black/50 backdrop-blur-md text-white p-4 shadow-lg sticky top-0 z-50">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2">
              <FaFutbol className="text-green-500" /> SportStream Pro
            </Link>
            <div className="text-sm text-gray-400">Live Football Coverage</div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto p-4">
          {/* Live Matches Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <FaFutbol className="text-green-500" /> Live Matches
            </h2>
            {matches.map(match => (
              <div key={match.id} className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl text-white">
                {/* Match Header */}
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold">{match.homeTeam}</div>
                    <div className="text-3xl font-bold px-4 py-2 bg-black/30 rounded-lg">{match.score}</div>
                    <div className="text-2xl font-bold">{match.awayTeam}</div>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="bg-red-500 px-2 py-1 rounded-full">LIVE</span>
                    <span>{format(new Date(match.startTime), 'HH:mm')}</span>
                  </div>
                </div>

                {/* Match Stats */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Live Events */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaHistory className="text-green-500" /> Match Events
                    </h3>
                    <div className="space-y-2">
                      {match.events.map(event => (
                        <div key={event.id} className="bg-black/20 p-2 rounded-lg flex items-center gap-2">
                          <span className="text-green-500 font-bold">{event.minute}'</span>
                          <span>{event.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Match Stats */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <FaChartLine className="text-green-500" /> Match Stats
                    </h3>
                    
                    {/* Possession */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{match.possession.home}%</span>
                        <span>Possession</span>
                        <span>{match.possession.away}%</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: `${match.possession.home}%` }}
                        />
                      </div>
                    </div>

                    {/* Shots */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{match.shots.home}</span>
                        <span>Shots</span>
                        <span>{match.shots.away}</span>
                      </div>
                      <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: `${(match.shots.home / (match.shots.home + match.shots.away)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis */}
                <div className="p-4 border-t border-white/10">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                    <FaStar className="text-green-500" /> Analysis
                  </h3>
                  <p className="text-gray-300">{match.analysis}</p>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </Router>
  );
}
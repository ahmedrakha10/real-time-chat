<?php

namespace App\Http\Controllers;

use App\Events\MessageDelivered;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {

        $messages = Message::all();
        return view('messages.index', compact('messages'));
    }

    public function store(Request $request)
    {
        $message = auth()->user()->messages()->create($request->only('body', 'user_id'));
        broadcast(new MessageDelivered($message->load('user')))->toOthers();
    }
}

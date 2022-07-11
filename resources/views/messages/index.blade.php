<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Messages') }}
        </h2>
    </x-slot>


    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <h3> Online users</h3>
                        <hr>
                        <h5 id="no-online-users">No online users</h5>
                        <ul class="list-group" id="online-users">
                        </ul>
                    </div>


                    <div class="col-md-9 d-flex flex-column" style="height: 80vh;">

                        <div class="h-100 bg-white mb-4 p-5" id="chat" style="overflow-y: scroll;">
                            @foreach($messages as $message)
                                <div class="mt-4 w-50 text-white p-3 rounded {{auth()->user()->id == $message->user_id ?
                               'float-right bg-primary' : 'float-left bg-dark'}}">
                                    <p>{{$message->body}}</p>
                                </div>
                                <div class="clearfix"></div>
                            @endforeach
                        </div>

                        <form action="" class="d-flex">
                            <input type="text" name="" data-url="{{route('messages.store')}}"
                                   style="margin-right: 10px;" class="form-control" id="text-chat">
                            <button class="btn btn-primary">Send</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</x-app-layout>

chatStream = new Meteor.Stream('chat');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to my chatroom.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    },
    'click submit': function(evt) {
      evt.preventDefault();
      sendChat($("[name='message']").val());
    }
  });

  sendChat = function(message) {
    chatStream.emit('message', message);
    console.log('me: ' + message);
    var newMessage = $('<p>').text('me: ' + message);
    $('.chat').append(newMessage);
  };

  chatStream.on('message', function(message) {
    console.log('user: ' + message);
    var newMessage = $('<p>').text('user: ' + message);
    $('.chat').append(newMessage);
  });


  $(document).ready(function() {
    $('#submit').click(function(evt) {
      evt.preventDefault();
      var message = $('#message').val();
      sendChat(message);
      $('#message').val('');
    });
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  // process.env.MAIL_URL="smtp://ellaf718%40gmail.com:  PASSWORD  @smtp.gmail.com:465/";
  // Email.send({
  //   from: "meteor-email@gmail.com",
  //   to: "elfang16@gmail.com",
  //   subject: "Meteor can send you emails through Gmail",
  //   text: "See above."
  // });

}

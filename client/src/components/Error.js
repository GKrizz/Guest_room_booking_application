import React from "react";

function Error({message}) {
  return (
    <div>
      <div class="alert alert-danger" role="alert">
        {/* Something went wrong ,Please Refresh it..! */}
        {message}
      </div>
    </div>
  );
}

export default Error;

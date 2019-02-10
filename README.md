# GN Window (General Window)
Lightweight Javascript Popup Window

## Setup
Requires jQuery. Built with jQuery 3.3.1.
1. In gn_window.js provide paths for window close and loading images.
2. Adjust optional defaults such as loading text and error message.

## Basic Use
The main functions are open, close, and remove. Open with take your desired content and parameters to display in the window. If a window is already open it will be removed before opening new content.
```
gnWindow.open({ content: "Content as string or object" });
```

Close will close the window including any closing options.
```
gnWindow.close();
```

Remove will close the window while skipping any closing options.
```
gnWindow.remove();
```

## Parameter Options

### content - String/JSON or Object/Hash
Loads and/or displays window content.
The content parameter takes either a string or an object

###### As String
When content value is a string it will be interpreted as being HTML and display it.
```
gnWindow.open( content: '<div><h1>Page Content</h1></div>' );
```

###### As Object
When content value is an object it will be directed to retrieve content as JSON via built in jQuery AJAX call. Call dataType is JSON and will expect HTML returned as JSON as the key content. Ex) {content: "HTML String"}.

###### Content Object Parameters
**url** - string (Required)
Url to retrieve JSON from.

**type** - string
Request type. Defaults to GET if not present.

**data** - object
Parameters to pass into AJAX call.
```
gnWindow.open({ content: {url: "/url_for_basic"} })
gnWindow.open({ content: {url: "/url_with_options", data: {id: 1}, type: "POST"} })
```

### fadeIn - Integer
Fade in time in milliseconds. Uses jQuery fadeIn function. Defaults to 'fast'.
```
gnWindow.open({ fadeIn: 500 })
```

### contentTimeout - Integer or String
Sets timeout duration for displaying page content.
A short timeout of is provided by default so that loading image and text is seen before content is displayed. The timeout length can be changed by providing an integer (milliseconds) or skipped string 'none' is provided.
```
gnWindow.open({ contentTimeout: 1000 });
gnWindow.open({ contentTimeout: 'none' });
```

### fixedWidth and fixedHeight - String
Add fixed height or width to window. Default width can be changed in CSS.
```
gnWindow.open({ fixedWidth: '720px' })
gnWindow.open({ fixedheight: '60vh' })
gnWindow.open({ fixedWidth: '400px', fixedheight: '400px' })
```
### loadingText - String
Provide text to be displayed above loading icon. Will use default if not provided.
```
gnWindow.open({ loadingText: 'In Progress...' });
```

### overlayClose - Boolean
If set to true, window will close when background overlay is clicked. Will use default if not provided.
```
gnWindow.open({ overlayClose: true });
```

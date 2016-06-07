
    ===========================
    Javascript Date Picker (BE)
    ===========================

Javascript Date Picker (BE) is a fork, created on 30 March 2016, of
Chris Hulbert's Javascript Date Picker, available from:

https://github.com/chrishulbert/datepicker

Here is Chris Hulbert's original notice with the software:

  I've been fed up with all the JS calendar date pickers that are out
  there - they're all too complicated, heavy, rely on frameworks that
  I don't want to include, or they're ugly, or have anti-commercial
  licenses, etc etc etc. So here's mine.
  
  Please see more details at my blog here:
  http://splinter.com.au/blog/?p=278
  
  License
  
  MIT license applies

Javascript Date Picker (BE) will continue to be offered under the same
terms as the original, the MIT license. For the avoidance of doubt, the
"MIT license" is interpreted to be the OSI version, the same as the
"Expat License". For details, see:

https://en.wikipedia.org/wiki/MIT_License


    Open Iconic Font
    ----------------

A reduced subset of the open source Open Iconic icon font is now
included in the package so that the example can show a calendar icon.

The original font is available from:

https://github.com/iconic/open-iconic

The subset font is offered under the same SIL licence as the original.

Note that the subset and the original fonts are incompatible, glyph
positions in the font table are different.


CHANGELOG

Version 1.2.0 - 7 June 2016

* Dates in the past are now disabled, cannot be selected.
* A new global variable can be used to specify dates not available for
    selection, as a list of day numbers from present.
* Top row buttons for changing the year have been removed as they are
    of no use in a practical date picker.
* Navigation of past months can be turned off with a new variable.
* The number of future months can be controlled with a new variable,
    default value is 12.
* Selection of a date can be followed by a call to a post-processing
    function, per new global variable setting.
* CSS colouring scheme has been improved.

Version 1.1.0 - 3 April 2016

* Modernised interface; all base64-encoded images removed and replaced
    with CSS code.
* Calendar icon now constructed with a <span> tag and CSS.
* Subset of Open Iconic font included.

Version 1.0.0 - 30 March 2016

Fork of the original.

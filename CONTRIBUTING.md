# Contribute to this project

This guide details how to use issues and pull requests to improve the shared code samples on this repository.

Please stick as close as possible to the guidelines. That way we ensure quality guides and easy to merge requests.

For better maintainance and clarity, some naming guidelines should be followed.

## Getting Started

### SSH Keys (Skip if you have them set up)
If you don't have a SSH key, you'll probably want one, so you can easily make changes
https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/

`ssh-keygen -t rsa -b 4096 -C "email@example.com"`

Then

`eval "$(ssh-agent -s)"`

`ssh-add ~/.ssh/id_rsa`

Adding the SSH key to github.com

`cat ~/.ssh/id_rsa.pub`

Copy the text to your github account

https://github.com/settings/keys

### Actually Contributing
Now that's all done, you get clone the repo and start contributing

Fork this repo in the Github GUI

`git clone git@github.com:youraccounthere/servicenow.git`

Now, modify the CONTRIBUTORS.md and add your name to the list of authors
Then add whatever you like based on the naming convention below;

## Pull Request title

Try to be as more descriptive as you can in your Pull Request title.

Particularly if you are submitting a new script or guide, include in the title,
information about Servicenow version, OS tested on and any other relevant info.

For example some good titles would be:

* [Type of thing] Name of thing
* [Catalog Client Script] Verify Phone number
* [UI Page] server decom.xhtml
* [Update set] Example Item with form validation
* [Multiple files]



